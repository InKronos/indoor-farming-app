import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";


const DevicesPage = () => {
    const { id, nameTitle } = useLocalSearchParams<{ id: string, nameTitle:string }>();
    const navigation = useNavigation();

    useEffect(() => {
      navigation.setOptions({ headerTitle: nameTitle});
    }, [navigation]);

    return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.statusText}>Status: Connected</Text>
        <Text style={styles.humidityText}>Humidity: 46%</Text>
        <Text style={styles.updateText}>Last Update: 22 May 2024 12:42</Text>
        <Button style={styles.button} mode="contained" buttonColor="#0082fc" onPress={() => {}}>
          Update
        </Button>
        <Button style={styles.button} mode="contained" buttonColor="#0082fc" onPress={() => {}}>
          Take Photo
        </Button>
      </View>
    </SafeAreaView>
    );
}

export default DevicesPage;

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#f0f0f0', // Light grey background for the safe area
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    statusText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2e8b57', // Sea green color for the status text
      marginBottom: 10,
    },
    humidityText: {
      fontSize: 16,
      color: '#696969', // Dim grey color for the humidity text
      marginBottom: 10,
    },
    updateText: {
      fontSize: 14,
      color: '#808080', // Grey color for the update text
      marginBottom: 20,
    },
    button: {
      width: '80%',
      color: "0082fc", 
      marginBottom: 10,
    },
  });
  