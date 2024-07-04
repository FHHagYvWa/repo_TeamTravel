import {
    View,
    Text,
    StyleSheet,
    Pressable,
    FlatList,
    TouchableOpacity,
    Keyboard,
    SafeAreaView,
    TouchableWithoutFeedback, Button, TextInput, Image, ActivityIndicator
} from "react-native";
import {router} from "expo-router";
import {globalStyles} from "../../styles/global";
import {useState} from "react";
import Header from "../../components/header";
import {StatusBar} from "expo-status-bar";

import {navigate} from "expo-router/build/global-state/routing";
import SearchSights from "../../components/search";

type Sight = {
    title: string,
    description: string,
    key: string
}

export default function HomePage (){

    const [sights, setSight] = useState<Sight[]>([
        {title: "Basilica de la Sagrada Familia", description: "Lovely description", opening_hours: "Mo-Fr 08:00 - 16:00", image: require('../../assets/icon.png'), key: "1"},
        {title: "Basilica de la Sagrada Familia", description: "Lovely description number 2", opening_hours: "Mo-Fr 08:00 - 16:00", image: require('../../assets/icon.png'), key: "2"},

    ]);


    /*zeigen, dass daten gerade laden*/
    const [loadingSpinner, setSpinner] = useState(false);


    /*wenn Suchen Button geklickt wird - City Id von API fetchen -> SUCCESSFUL LOGGING*/
    const submitHandler = (text:string) => {
        text = text.replace(/\s+/g, '-').toLowerCase();

        const countryName = text;
        console.log(countryName);

        /*show spinner*/
        setSpinner(true);

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
            const placeId = place_id;
            console.log("place id: " + placeId);


            /*Sehenswürdigkeiten fetchen -> SUCCESSFUL LOGGING*/
            const getSightsFromApi = () => {
                return fetch(`https://api.geoapify.com/v2/places?categories=tourism.sights&filter=place:${placeId}&limit=20&apiKey=5b21eb9631084a9fb9cf8bfab2cf5e93`)
                    .then(response => response.json())
                    .then(json => {
                        /*Daten setzen mit neuen Sehenswürdigkeiten - mit setSight gesetzt*/
                        const sightItems = json.features.map(item => ({
                            title: item.properties.name,
                            description: item.properties.address_line2,
                            opening_hours: item.properties.opening_hours ? item.properties.opening_hours : item.properties.datasource.raw.opening_hours,
                            image: item.properties.wiki_and_media.image,
                            key: Math.random().toString()
                        }));
                        console.log(typeof (sightItems[3].image));
                        setSight(sightItems);

                        /*loadingSpinner deaktivieren*/
                        setSpinner(false);


                        return json.features;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            };

            getSightsFromApi().then(features => {
                console.log(features);
                const featuresArray = features;

            });
        });





    }


    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <SafeAreaView style={styles.safe}>
                <View style={globalStyles.container}>
                    <StatusBar style="auto" />
                    {/* header rendered through expo navigation*/}

                    <View style={styles.content}>
                        <Text>Welche Stadt möchtest du erkunden?</Text>



                        <View style={styles.searchContainer}>

                            {/*aus search.tsx*/}
                            <SearchSights submitHandler={submitHandler}/>

                            {/*loadingSpinner platzieren*/}
                            {loadingSpinner && <ActivityIndicator size="large" color="#ffc50a" styles={styles.loader} />}

                        </View>
                        <Text>Aktuelles Wetter: </Text>
                        <View style={styles.wetter}>
                            <Text>Platzhalter für Wetter aus API</Text>
                        </View>
                        <Text>Sehenswürdigkeiten: </Text>

                        <FlatList styles={styles.list} data={sights} renderItem={({item})=>(
                            <TouchableOpacity style={globalStyles.card} onPress={()=>router.push({pathname:item.key,params:item})}>

                                <Image source={item.image ? {uri:item.image.toString()} : require('../../assets/icon.png').toString()} style={globalStyles.cardImage}></Image>
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
    loader:{
        paddingTop: 100,
    },
    list:{
        marginBottom: 200,
    },
    searchContainer:{
        width: '80%',
        marginBottom: 40,
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