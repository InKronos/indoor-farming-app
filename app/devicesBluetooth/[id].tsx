import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import useBLE from "../../useBLE";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, Button, Appbar, Title, Subheading } from 'react-native-paper';


const DeviveBluetooth = () => {
    const { id, nameTitle } = useLocalSearchParams<{ id: string, nameTitle: string }>();

    const navigation = useNavigation();

    const {
        connectToDevice,
        connectedDevice,
        disconnectFromDevice,
        LogIntroWiFi,
        readText
      } = useBLE();

    useEffect(() => {
      navigation.setOptions({ headerTitle: nameTitle});
    }, [navigation]);

    useEffect(() => {
        if(id)
            connectToDevice(id);
    }, []);

    const [wifiName, setWifiName] = useState('');
    const [wifiPassword, setWifiPassword] = useState('');

    const logIntoWifi = () => {
      console.log(`WiFi Name: ${wifiName}, WiFi Password: ${wifiPassword}`);
      LogIntroWiFi(wifiName, wifiPassword);
    };

    const read = () => {
      const texxt = readText();
      console.log(texxt)
    }
    return(
     <SafeAreaView style={styles.container}>
      <View style={styles.statusContainer}>
        <Title>WiFi Status</Title>
        {/* <Subheading style={{ color: "green"}}>
          Connected
        </Subheading> */}
        <Button mode="contained" onPress={read} style={styles.checkButton}>
          Check WiFi Connection
        </Button>
      </View>
      <View style={styles.loginContainer}>
        <TextInput
          label="WiFi Name"
          value={wifiName}
          onChangeText={setWifiName}
          style={styles.input}
        />
        <TextInput
          label="WiFi Password"
          secureTextEntry
          value={wifiPassword}
          onChangeText={setWifiPassword}
          style={styles.input}
        />
        <Button mode="contained" onPress={logIntoWifi} style={styles.loginButton}>
          Log Into WiFi
        </Button>
      </View>
      <View style={styles.statusContainer}>
        <Button mode="contained" onPress={disconnectFromDevice} style={styles.checkButton}>
          Disconnect
        </Button>
      </View>
    </SafeAreaView>
    );
}

export default DeviveBluetooth;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    statusContainer: {
      padding: 16,
    },
    loginContainer: {
      padding: 16,
      color: "#0082fc",
    },
    input: {
      marginBottom: 12,
      color: "#0082fc",
    },
    checkButton: {
      marginBottom: 16,
      backgroundColor: "#0082fc",
    },
    loginButton: {
      marginTop: 16,
      backgroundColor: "#0082fc",
    },
  });