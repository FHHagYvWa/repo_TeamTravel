import {View, Text, StyleSheet, Image} from "react-native";
import {useLocalSearchParams} from "expo-router";

export default function SightDetail (){

    let item = useLocalSearchParams();
    return(
        <View style={styles.container}>
            <Image source={require('../../assets/icon.png')} style={styles.image}></Image>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.description}>{item.opening_hours}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#f0e9de',
        padding: 24,
    },
    titleText: {
        fontFamily: 'libre-regular',
    },
    description: {
        fontFamily: 'raleway-regular',
        marginBottom: 10
    },
    image: {
        width: 300,
        height: 150
    }
});