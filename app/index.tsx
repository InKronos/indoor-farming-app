import { Link, router } from "expo-router";
import { Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { FAB, List, Text } from "react-native-paper";
import useWiFi from "../useWiFi";
import { useCallback, useEffect, useState } from "react";
import Zeroconf from "react-native-zeroconf";

interface homeScreenProps {
    
}

const home = (props: homeScreenProps) => {

    const {
        scanForDevices
      } = useWiFi();

     const zeroconf = new Zeroconf();
    const [devices, setDevices] = useState<WiFiDevice[]>([]);

      useEffect(() => {
        zeroconf.on('start', () => {
            console.log('[Start]')
          })
      
          zeroconf.on('stop', () => {
            console.log('[Stop]')
          })
      
          zeroconf.on('resolved', service => {
            console.log('[Resolve]', JSON.stringify(service, null, 2))
            setDevices([...devices, {name: service.name, ip: service.addresses[0]}])
          })
          zeroconf.on('error', err => {
            console.log('[Error]', err)
          })
      }, []);
    
    
    


    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        zeroconf.scan();
        zeroconf.scan('http', 'tcp', 'local.')

        
        
        setTimeout(() => {
        
        setRefreshing(false);
        zeroconf.stop();
        }, 15000);
    }, []);

    
    return(
        <SafeAreaView style={{flex: 1}}>
            <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                  
                { devices.length !== 0 ? devices.map((device) => 
                     <List.Item
                     key={device.ip}
                     title={device.name}
                     onPress={() => router.push({
                        pathname: "/devicesWiFi/[id]",
                        params: { id: device.ip, nameTitle: device.name },
                      })}
                     description="Connected"
                     left={props => <List.Icon 
                        {...props} 
                        icon={device.name.includes("Raspberry") ? "raspberry-pi" :"panda"} 
                    />}
                     right={props => <List.Icon {...props} icon="eye" />}
                />
                ) : <><Text style={{alignSelf: "center", margin: 3}}>No devices, refresh to check again </Text></>}
            </ScrollView>
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
    },
    
  });

export default home;