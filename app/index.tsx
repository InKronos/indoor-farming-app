import { Link, router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { FAB, List } from "react-native-paper";
import HeaderComponent from "../components/header";

interface homeScreenProps {
    
}

const home = (props: homeScreenProps) => {


    return(
        <SafeAreaView style={{flex: 1}}>
            <View>
                
                    <List.Item
                    
                     key="1"
                     title="Raspberry PI1"
                     onPress={() => {}}
                     description="Connected"
                     left={props => <List.Icon 
                        {...props} 
                        icon="raspberry-pi" 
                    />}
                     right={props => 
                        <Pressable
                        onPress={() =>
                          router.push({
                            pathname: "/devices/[id]",
                            params: { id: 1, nameTitle: "Raspberry PI1" },
                          })
                        }
                      >
                            <List.Icon {...props} icon="eye" />
                        </Pressable>}
                />
                
                <List.Item
                     key="2"
                     title="LattePanda PI1"
                     onPress={() => {}}
                     description="Connected"
                     left={props => <List.Icon 
                        {...props} 
                        icon="panda" 
                    />}
                     right={props => <List.Icon {...props} icon="eye" />}
                />
            </View>
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
        backgroundColor: "#0082fc",
        color: "white"
    }
  });

export default home;