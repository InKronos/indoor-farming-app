import { StatusBar } from 'expo-status-bar';
import { ListRenderItemInfo, Modal, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useBLE from '../useBLE';
import { FC, useCallback, useEffect, useState } from 'react';
import DeviceModal from '../components/DeviceConnectionModal';
import { Device } from 'react-native-ble-plx';
import { List } from 'react-native-paper';
import { router } from 'expo-router';



const bluetoothConnect = () => {
    const {
      requestPermissions,
      scanForPeripherals,
      allDevices,
    } = useBLE();


  useEffect(() => {
    scanForDevices();
  },[])

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
      setRefreshing(true);
      scanForDevices();
      setTimeout(() => {
      setRefreshing(false);
      }, 2000);
  }, []);

  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {allDevices && allDevices.map((device) => <>
          <List.Item
                     key={device.id}
                     title={device.name}
                     onPress={() => router.push({
                        pathname: "/devicesBluetooth/[id]",
                        params: { id: device.id, nameTitle: device.name },
                      })}
                     description="bluetooth on"
                     left={props => <List.Icon 
                        {...props} 
                        icon="devices"
                    />}
                     right={props => <List.Icon {...props} icon="bluetooth" />}
                />
        </>)}
      </ScrollView>
      
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  ctaButton: {
    backgroundColor: "#FF6060",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  }
});

export default bluetoothConnect;