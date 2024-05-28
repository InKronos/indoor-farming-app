import { StatusBar } from 'expo-status-bar';
import { Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useBLE from '../useBLE';
import { useState } from 'react';
import DeviceModal from '../components/DeviceConnectionModal';

const bluetoothConnect = () => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
    readText,
    LogIntroWiFi
  } = useBLE();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [text, setText] = useState<string | undefined>("");
  const [isWifiPopUpOn, setIsWifiPopUpOn] = useState<boolean>(false);
  const [wifiName, setWifiName] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };


  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };

  const openPopUp = () => {
    setIsWifiPopUpOn(true);
  }

  const hidePopUp = () => {
    setIsWifiPopUpOn(false);
  }




  const logIntoWifi = () => {
    // Handle the logic for logging into Wi-Fi here
    // For example, sending the Wi-Fi credentials to the Raspberry Pi via Bluetooth
    console.log(`WiFi Name: ${wifiName}, WiFi Password: ${wifiPassword}`);
    // Implement the logic to send these credentials via Bluetooth
    LogIntroWiFi(wifiName, wifiPassword);
    hidePopUp();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heartRateTitleWrapper}>
        {connectedDevice ? (
          <>
            
            <Text style={styles.heartRateTitleText}>Your Heart Rate Is:</Text>
            <Text style={styles.heartRateText}>1 bpm</Text>
            <Text style={styles.heartRateText}>{text}</Text>
            <TouchableOpacity
              onPress={openPopUp}
              style={styles.ctaButton}
            >
              <Text style={styles.ctaButtonText}>
                Log Intro Wifi
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.heartRateTitleText}>
            Please Connect to a Raspberry Pi
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {connectedDevice ? "Disconnect" : "Connect"}
        </Text>
      </TouchableOpacity>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isWifiPopUpOn}
        onRequestClose={hidePopUp}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter Wi-Fi Credentials</Text>
            <TextInput
              placeholder="WiFi Name"
              value={wifiName}
              onChangeText={setWifiName}
              style={styles.input}
            />
            <TextInput
              placeholder="WiFi Password"
              value={wifiPassword}
              onChangeText={setWifiPassword}
              secureTextEntry
              style={styles.input}
            />
            <TouchableOpacity onPress={logIntoWifi} style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={hidePopUp} style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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