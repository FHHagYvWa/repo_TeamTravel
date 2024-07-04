import {View, Text, StyleSheet, Image} from "react-native";
import {useLocalSearchParams} from "expo-router";

export default function SightDetail (){

    let item = useLocalSearchParams();
    return(
        <View style={styles.container}>
            <Image source={item.image ? {uri:item.image.toString()} : require('../../assets/icon.png').toString()} style={styles.image}></Image>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            {/* TODO show heading "Opening hours:" if opening hours are specified*/}


            {/* TODO show opening hours ONLY if they are specified*/}
            {/* weil manchmal steht "none"*/}
            <Text style={styles.description}>{item.opening_hours}</Text>

            {/* TODO show link to website if available*/}
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