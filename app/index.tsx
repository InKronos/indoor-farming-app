import { Link } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";

interface homeScreenProps {
    
}

const home = (props: homeScreenProps) => {


    return(
        <SafeAreaView style={{flex: 1}}>
            <View></View>
            <Link href="/bluetoothConnect" style={{position: "absolute", bottom: 0, right: 0, margin: 5}}>
                <FAB
                    icon="bluetooth"
                    style={styles.fab}
                    color={"white"}
                /> 
            </Link>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    fab: {       
        borderRadius: 100,
        backgroundColor: "#b3e5fc",
        color: "white"
    }
  });

export default home;