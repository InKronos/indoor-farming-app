import { Stack, useLocalSearchParams } from "expo-router";


type RootStackParamList = {
    index: undefined;
    'devices/[id]': { name: string };
  };

  

const RootLayout = () => {

  return (
    <Stack>
      <Stack.Screen name="index"
      options={{
        headerTitle: "Indoor Farming",
        headerStyle: {
            backgroundColor: '#0082fc',
          },
        headerTintColor: '#fff',
      }}/>
      <Stack.Screen name="devicesWiFi/[id]"
      options={{
        headerStyle: {
            backgroundColor: '#0082fc',
          },
        headerTintColor: '#fff',
      }}
        />
      <Stack.Screen name="devicesBluetooth/[id]"
      options={{
        headerStyle: {
            backgroundColor: '#0082fc',
          },
        headerTintColor: '#fff',
      }}
        />
      <Stack.Screen name="bluetoothConnect"
      options={{
        headerTitle: "Connect to bluetooth device",
        headerStyle: {
            backgroundColor: '#0082fc',
          },
        headerTintColor: '#fff',
      }}
        />
    </Stack>
    
  );
};

export default RootLayout;