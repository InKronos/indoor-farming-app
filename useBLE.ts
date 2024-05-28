/* eslint-disable no-bitwise */
import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import base64 from 'react-native-base64';
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from "react-native-ble-plx";

import * as ExpoDevice from "expo-device";



interface BluetoothLowEnergyApi {
  requestPermissions(): Promise<boolean>;
  scanForPeripherals(): void;
  allDevices: Device[];
  connectToDevice: (deviceId: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  infoFromDevice: string;
  readText(): Promise<string | undefined>;
  LogIntroWiFi(wifiSSID: string, wifiPassword: string): Promise<void>;
}

function useBLE(): BluetoothLowEnergyApi {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [infoFromDevice, setInfoFromDevice] = useState<string>("");

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Scan Permission",
        message: "Bluetooth Low Energy requires Scanning",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Connect Permission",
        message: "Bluetooth Low Energy requires Connection",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const scanForPeripherals = () =>
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      }
      if (device && device.name?.includes("BLE")) {
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicteDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });

  const connectToDevice = async (device: Device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      
      const deviceAndCharacteristics = await deviceConnection.discoverAllServicesAndCharacteristics();
      setConnectedDevice(deviceAndCharacteristics);
      
      
      bleManager.stopDeviceScan();
    } catch (e) {
      console.log("FAILED TO CONNECT", e);
    }
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
    }
  };
  

  const LogIntroWiFi = async (wifiSSID: string, wifiPassword: string) => {
    try{
      console.log(wifiSSID + ":" + wifiPassword);
      console.log(connectedDevice?.id);
      await connectedDevice?.writeCharacteristicWithoutResponseForService(
        'a07498ca-ad5b-474e-940d-16f1fbe7e8cd',
        '51ff12bb-3ed8-46e5-b4f9-d64e2fec021b',
        base64.encode(wifiSSID + ":" + wifiPassword)
      ).then((res) => {
        console.log("Write:");
        console.log("res",res)
      })
      .catch((error) => {
        console.log(error);
      });
      
      
      // const text = await bleManager.readCharacteristicForDevice(
      //   connectedDevice?.id ?? "",
      //   'a07498ca-ad5b-474e-940d-16f1fbe7e8cd',
      //   '51ff12bb-3ed8-46e5-b4f9-d64e2fec021b'
      // );
    }
    catch(e) {
      console.log(e);
    }
  }

  const readText = async () => {
    try {
      if(connectedDevice){
        console.log(connectedDevice.name);
        console.log(connectedDevice.id);

        const services =  await connectedDevice.services()
        console.log(services);
        const charet = await connectedDevice.characteristicsForService("a07498ca-ad5b-474e-940d-16f1fbe7e8cd");
        console.log(charet);
      }
      const text = await bleManager.readCharacteristicForDevice(
        connectedDevice?.id ?? "",
        '0000180a-0000-1000-8000-00805f9b34fb',
        '00002b2a-0000-1000-8000-00805f9b34fb'
      );
      return base64.decode(text.value!);
    } catch (e) {
      console.log(e);
    }
  };

  return {
      scanForPeripherals,
      requestPermissions,
      allDevices,
      connectToDevice,
      connectedDevice,
      disconnectFromDevice,
      infoFromDevice,
      readText,
      LogIntroWiFi
  }
}



export default useBLE;