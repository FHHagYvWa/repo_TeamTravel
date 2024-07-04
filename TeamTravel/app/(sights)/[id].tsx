import {View, Text, StyleSheet, Image, Linking, TouchableOpacity} from "react-native";
import {useLocalSearchParams} from "expo-router";

export default function SightDetail (){

    let item = useLocalSearchParams();
    return (
        <View style={styles.container}>
            <Image
                source={item.image ? {uri: item.image.toString()} : require('../../assets/Placeholder.png').toString()}
                style={styles.image}></Image>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>

            {/* show opening hours ONLY if they are specified*/}
            <Opening item={item}/>


            {/* TODO show link to website if available*/}
            <OpenWebsite item={item}/>
        </View>
    );
}

const Opening = ({item}) => {


    if (item.opening_hours && item.opening_hours != 'none') {
        return (
            <View>
                <Text>Opening Hours: </Text>
                <Text>{item.opening_hours}</Text>
            </View>
        );
    }

    return null;
};

const OpenWebsite = ({item})=>{
    if (item.website ) {
        return (
            <View>
                <Text>Website: </Text>
                <Text>{item.website}</Text>
            </View>
        );
    }

    return null;
}

const openWebsite = (url) => {
    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        })
        .catch((err) => console.error('An error occurred', err));
};

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