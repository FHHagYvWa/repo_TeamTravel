import {
    View,
    Text,
    StyleSheet,
    Pressable,
    FlatList,
    TouchableOpacity,
    Keyboard,
    SafeAreaView,
    TouchableWithoutFeedback, Button, TextInput, Image
} from "react-native";
import {router} from "expo-router";
import {globalStyles} from "../../styles/global";
import {useState} from "react";
import Header from "../../components/header";
import {StatusBar} from "expo-status-bar";
import Detail from "../../components/detail";
import {navigate} from "expo-router/build/global-state/routing";

type Sight = {
    title: string,
    description: string,
    key: string
}

export default function HomePage (){

    const [sights, setSight] = useState<Sight[]>([
        {title: "Basilica de la Sagrada Familia", description: "Lovely description", key: "1"},
        {title: "Basilica de la Sagrada Familia", description: "Lovely description number 2", key: "2"},

    ]);

    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <SafeAreaView style={styles.safe}>
                <View style={globalStyles.container}>
                    {/* header rendered through expo navigation*/}

                    <View style={styles.content}>
                        <Text>Welche Stadt möchtest du erkunden?</Text>
                        <View>
                            <TextInput style={styles.input} placeholder={'Mein Reiseziel'}
                                       /*value={text} onChangeText={setText}*//>
                            <Button  title={'Suchen'} /*style={styles.button} */ /*onPress={()=>props.submitHandler(text)}*//>
                            <Pressable style={styles.suchButton}>
                                <Text style={styles.suchButtonText}>Suchen</Text>
                            </Pressable>
                        </View>
                        <Text>Aktuelles Wetter: </Text>
                        <View style={styles.wetter}>
                            <Text>Platzhalter für Wetter aus API</Text>
                        </View>
                        <Text>Sehenswürdigkeiten: </Text>
                        <StatusBar style="auto" />
                        <FlatList data={sights} renderItem={({item})=>(
                            <TouchableOpacity style={globalStyles.card} onPress={()=>router.push({pathname:item.key,params:item})}>

                                <Image source={require('../../assets/icon.png')} style={globalStyles.cardImage}></Image>
                                <Text style={globalStyles.titleText}>{item.title}</Text>
                                <Text style={globalStyles.cardDescription}>{item.description}</Text>


                            </TouchableOpacity>
                        )}/>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>

    );
}



const styles = StyleSheet.create({
    safe:{
        flex: 1,
    },
    container: {
        padding: 24,
    },
    content: {
        padding: 20,
        alignItems: "center",
        fontFamily: "Raleway-Italic"
    },
    input: {
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#ddd',
        borderRadius: 15
    },
    suchButton: {
        backgroundColor: '#f0e9de',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        elevation: 3,
        marginBottom: 20,
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: {width: 4, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        marginRight: 10

    },
    suchButtonText: {
        color: 'black',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,

    },
    titleText: {
        fontFamily: "LibreBaskerville-Regular",
    },
    wetter: {
        backgroundColor: '#f0e9de',
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 10,

    }

})