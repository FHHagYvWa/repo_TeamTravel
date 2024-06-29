import {Text, View, StyleSheet, Image} from "react-native";
import {globalStyles} from "../styles/global";

export default function Detail(){
    return (
        <View style={styles.container}>
            <Image source={require('../assets/icon.png')} style={styles.image}></Image>
            <Text style={styles.titleText}>Test</Text>
            <Text style={styles.description}>Test</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
       backgroundColor: '#f0e9de'
    },
    titleText: {
        fontFamily: "LibreBaskerville-Regular",
    },
    description: {
        fontFamily: "Raleway-Regular"
    },
    image: {
        width: 300,
        height: 150
    }
});