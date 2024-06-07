import { useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import Zeroconf from 'react-native-zeroconf';

import * as ExpoDevice from "expo-device";


interface service {
    addresses: string[];
    server: string;
}
interface WiFiAPI{
    scanForDevices(): Promise<WiFiDevice[]>;
}


function useWiFi(): WiFiAPI{

    const [server, setServer] = useState(null);
    const zeroconf = new Zeroconf();

   

    const scanForDevices = async (): Promise<WiFiDevice[]> => {
        const [devices, setDevices] = useState<WiFiDevice[]>([]);
        const foundDevices: WiFiDevice[] = [];

        return new Promise((resolve, reject) => {
            zeroconf.on('start', () => console.log('The scan has started.'))

            zeroconf.on('resolved', (service) => {
                const device: WiFiDevice = {
                    ip: service.addresses[0], // Assuming first address is IPv4
                    name: service.name,
                };
                foundDevices.push(device);
            });

            zeroconf.on('error', (err) => {
                console.error('Error', err);
                reject(err);
            });

            zeroconf.on('stop', () => {
                console.log('The scan has stopped.');
                resolve(foundDevices);
            });

            zeroconf.scan('_http._tcp.local.');

            // Stop scan after a timeout
            setTimeout(() => {
                zeroconf.stop();
                setDevices(foundDevices);
            }, 5000); // Adjust the timeout duration as needed
        });
    };

    return{
        
        scanForDevices,
    }
}

export default useWiFi;