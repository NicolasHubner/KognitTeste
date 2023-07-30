import Routes from '@/routes';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Box } from 'native-base';
import { LogBox } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
    return (
        <NativeBaseProvider>
            <Routes />
            <StatusBar style="auto" />
        </NativeBaseProvider>
    );
}

LogBox.ignoreLogs([
    'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
]);

// Problema apresentado recente no NativeBase https://github.com/GeekyAnts/NativeBase/issues/5758
