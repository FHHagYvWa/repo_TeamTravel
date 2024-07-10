import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';

export default function App() {
    return (
        <View>
            <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },
    content: {
        padding: 40,
    }

});
