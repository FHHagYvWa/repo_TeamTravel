import {View, Text, StyleSheet, Image, Linking, TouchableOpacity} from "react-native";
import {useLocalSearchParams} from "expo-router";
import { A } from '@expo/html-elements';

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
            <OpeningHours item={item}/>


            {/*show link to website if available*/}
            <OpenWebsite item={item}/>
        </View>
    );
}

const OpeningHours = ({item}) => {
    if (item.opening_hours && item.opening_hours != 'none') {
        return (
            <View>
                <Text style={styles.openingTitle}>Opening Hours: </Text>
                <Text style={styles.description}>{item.opening_hours}</Text>
            </View>
        );
    }

    return null;
};

const OpenWebsite = ({item})=>{
    if (item.website ) {
        return (
            <View>
                <A href={item.website} style={styles.website}>Click here to open the Website</A>
            </View>
        );
    }

    return null;
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#f0e9de',
        padding: 24,
    },
    titleText: {
        fontFamily: 'libre-bold',
    },
    description: {
        fontFamily: 'raleway-regular',
        marginBottom: 10
    },
    openingTitle: {
        fontFamily: 'raleway-bold',
        fontWeight: 'bold',
        marginBottom: 5
    },
    website: {
        fontFamily: 'raleway-italic',
        marginBottom: 10
    },
    image: {
        width: 300,
        height: 150,
        marginBottom: 7
    }
});