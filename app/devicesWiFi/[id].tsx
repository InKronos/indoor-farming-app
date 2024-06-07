import axios from "axios";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";



interface ImageData {
  base64Data: string;
  prediction: string;
}

interface updateData {
  time: string;
  humidity: string;
}
const DevicesPage = () => {
    const { id, nameTitle } = useLocalSearchParams<{ id: string, nameTitle:string }>();
    const navigation = useNavigation();
    const [photo, setPhoto] = useState<string | undefined>(undefined);
    const [isPhotoLoaded, setIsPhotoLoaded] = useState<boolean>(false);
    const [uri, setUri] = useState<string>("false");
    const [prediction, setPrediction] = useState<string>("");
    const [datetime, setDatetime] = useState<string>("");
    const [humidity, setHumidity] = useState<string>("");

    useEffect(() => {
      getUpdate();
    },[])
    useEffect(() => {
      navigation.setOptions({ headerTitle: nameTitle});
    }, [navigation]);


    useEffect(() => {
      if(typeof photo === "string")
        setIsPhotoLoaded(true); // returns 0;
        setUri(`data:image/png;base64,${photo}`);
        
        console.log(photo);
    }, [photo]);

    const takePhoto = async () => {
      try{
          const response = await axios.get<ImageData>(`http://${id}:4000/get_image`)
          setPhoto(response.data.base64Data);
          setPrediction(response.data.prediction);
          setIsPhotoLoaded(true);
        
      }
      catch(error){
        console.log(error);
      }
  }

  const getUpdate = async () => {
      try{
        const response = await axios.get<updateData>(`http://${id}:4000/update`)
        setDatetime(response.data.time);
        setHumidity(response.data.humidity);
      }
      catch(error){
        console.log(error);
      }
  }
    

    return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.statusText}>Status: Connected</Text>
        <Text style={styles.humidityText}>Humidity: {humidity}%</Text>
        <Text style={styles.updateText}>Last Update: {datetime}</Text>
        <Button style={styles.button} mode="contained" buttonColor="#0082fc" onPress={getUpdate}>
          Update
        </Button>
        <Button style={styles.button} mode="contained" buttonColor="#0082fc" onPress={takePhoto}>
          Take Photo
        </Button>
        {isPhotoLoaded && (<><Image 
        style={{width: 200, height: 200}} 
        source={{ uri: `data:image/png;base64,${photo}`  }}>
        
        </Image> 
      </>)}
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
  