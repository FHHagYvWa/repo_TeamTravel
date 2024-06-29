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
import SearchSights from "../../components/search";

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


    /*test for api city id fetch -> SUCCESSFUL LOGGING*/
    const submitHandler = (text:string) => {
        text = text.replace(/\s+/g, '-').toLowerCase();

        const countryName = text;
        console.log(countryName);
        const getCityIdFromApi = () => {
            return fetch(`https://api.geoapify.com/v1/geocode/search?text=${countryName}&limit=1&type=city&format=json&apiKey=5b21eb9631084a9fb9cf8bfab2cf5e93`)
                .then(response => response.json())
                .then(json => {
                    return json.results[0].place_id;
                })
                .catch(error => {
                    console.error(error);
                });
        };

        getCityIdFromApi().then(place_id => {
            console.log(place_id);
        });
    }


    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <SafeAreaView style={styles.safe}>
                <View style={globalStyles.container}>
                    {/* header rendered through expo navigation*/}

                    <View style={styles.content}>
                        <Text>Welche Stadt möchtest du erkunden?</Text>



                        <View style={styles.searchContainer}>

                            {/*TEST with search.tsx*/}
                            <SearchSights submitHandler={submitHandler}/>



                            <TextInput style={globalStyles.searchInput} placeholder={'Mein Reiseziel'}
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
    searchContainer:{
        width: '80%'
    }
    ,
    container: {
        padding: 24,
    },
    content: {
        padding: 20,
        alignItems: "center",
        fontFamily: "raleway-italic"
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
    wetter: {
        backgroundColor: '#f0e9de',
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 10,

    }

})