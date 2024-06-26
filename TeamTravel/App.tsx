import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Header from "./components/header";
import {globalStyles} from "./styles/global";

export default function App() {
  return (
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>


  );
}

const styles = StyleSheet.create({
  safe:{
    flex: 1,
  },
  content:{
    padding: 40,
  }

});
