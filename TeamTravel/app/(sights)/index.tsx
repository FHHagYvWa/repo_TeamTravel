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
import {A} from "@expo/html-elements";

type Sight = {
    title: string,
    description: string,
    key: string
}

type Weather = {
    temp_c: string,
    description: string
    image: string
}

export default function HomePage() {

    const [sights, setSight] = useState<Sight[]>([
        {
            title: "Basilica de la Sagrada Familia",
            description: "Lovely description",
            opening_hours: "Mo-Fr 08:00 - 16:00",
            image: require('../../assets/icon.png'),
            key: "1"
        },
        {
            title: "Basilica de la Sagrada Familia",
            description: "Lovely description number 2",
            opening_hours: "Mo-Fr 08:00 - 16:00",
            image: require('../../assets/icon.png'),
            key: "2"
        },

    ]);

    const [weather, setWeather] = useState<Weather[]>([
        {
            temp_c: "0",
            description: "No location selected",
            image: ""
        }]);

    /*zeigen, dass daten gerade laden*/
    const [loadingSpinner, setSpinner] = useState(false);

    const getProperty = property => {
        const getter = o => {
            if (o && typeof o === 'object') {
                return Object.entries(o)
                    .map(([key, value]) => key === property ? value : getter(value))
                    .filter(Boolean)
                    .shift()
            }
        }

        return getter
    }

    /*wenn Suchen Button geklickt wird - City Id von API fetchen -> SUCCESSFUL LOGGING*/
    const submitHandler = (text: string) => {
        text = text.replace(/\s+/g, '-').toLowerCase();

        const countryName = text;
        console.log(countryName);

        /*show spinner*/
        setSpinner(true);

        const getWeatherFromApi = () => {
            return fetch(`http://api.weatherapi.com/v1/current.json?key=f5184d81eafa4f98a4a122942242806&q=${countryName}`)
                .then(response => response.json())
                .then(json => {
                    /* Filtern und Daten setzen mit neuem Wetter */

                    const getImage = getProperty('icon');
                    const weatherItems = {
                        temp_c: json.current.temp_c,
                        description: json.current.condition.text,
                        image: json.current.condition.icon
                    };

                    console.log(weatherItems.temp_c);
                    console.log(weather.map(item => weatherItems.temp_c + "°C " + weatherItems.description))

                    setWeather([weatherItems]);
                })
                .catch(error => {
                    console.error(error);
                });
        };

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
                        /* Filtern und Daten setzen mit neuen Sehenswürdigkeiten */

                        const getImage = getProperty('image');
                        const sightItems = json.features
                            .filter(item => item.properties.name)  // Filtert Elemente ohne "name" Attribut aus
                            .map(item => ({
                                title: item.properties.name,
                                description: item.properties.address_line2,
                                opening_hours: item.properties.opening_hours ? item.properties.opening_hours : item.properties.datasource.raw.opening_hours,
                                image: getImage(item) || null,//item?.properties?.wiki_and_media?.image || item?.properties?.datasource?.raw?.image,
                                website: item.properties.website,
                                key: Math.random().toString()
                            }));

                        // console.log(typeof (sightItems[3].image));
                        // console.log(typeof (sightItems[3]));

                        //console.log(typeof (sightItems[0].image));

                        setSight(sightItems);

                        /* loadingSpinner deaktivieren */
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
            getWeatherFromApi().then(weather => {
                console.log(weather);
            });
        });
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.safe}>
                <View style={globalStyles.container}>
                    <StatusBar style="auto"/>
                    {/* header rendered through expo navigation*/}

                    <View style={styles.content}>
                        <Text style={styles.setFont}>Which city would you like to explore?</Text>
                        <View style={styles.searchContainer}>

                            {/* TODO maybe (nur wenn easy möglich) ein X am Ende der Zeile zum Löschen des gesamten Inhalts */}
                            {/*aus search.tsx*/}
                            <SearchSights submitHandler={submitHandler}/>

                            {/*loadingSpinner platzieren*/}
                            {loadingSpinner && <ActivityIndicator size="large" color="#ffc50a" styles={styles.loader}/>}

                        </View>
                        <Text style={styles.subHeadings}>Current Weather:{}</Text>
                        <View style={styles.wetter}>
                            <Text>{weather.map(
                                item => item.temp_c + "°C " + "\n"+ item.description
                            )}</Text>
                            <Image
                                source={weather.map(item => item.image ? {uri: "https:" + item.image} : require('../../assets/Placeholder.png').toString())}
                                style={styles.weatherImage}></Image>
                           </View>
                        <Text style={styles.subHeadings}>Sights: </Text>

                        {/* TODO show info if no sights are found */}
                        {/* also if features ist [] */}
                        {/*<SightsReturned features={item}/>*/}

                        <FlatList styles={styles.list} data={sights} renderItem={({item}) => (
                            <TouchableOpacity style={globalStyles.card}
                                              onPress={() => router.push({pathname: item.key, params: item})}>

                                {/*
                                IF image is available
                                AND image is a string
                                AND does not include any of specified url segments (img links are not standardized, can not be displayed because of link type e.g. wikipedia article) not all invalids covered (weil do wird ma oid, wenn ma jeden link bei jedem sight in jeder stadt checken müsste)
                                AND includes image file extension
                                THEN display image
                                ELSE display placeholder image
                                 */}
                                <Image
                                    source={item?.image && (typeof item?.image === "string" || item?.image instanceof String) && !item?.image?.includes("wikipedia.org/wiki/") && !item?.image?.includes("wikimedia.org/wiki/") && (item?.image?.includes(".jpg") || item?.image?.includes(".jpeg") || item?.image?.includes(".png")) ? {uri: item.image.toString()} : require('../../assets/Placeholder.png').toString()}
                                    style={globalStyles.cardImage}></Image>
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

const SightsReturned = ({features})=>{
    if (features.length && features.length < 0 ) {
        return (
            <View>
                <Text>No sights could be found for your desired location. Tip: When searching for
                    a larger city like New York, try searching for specific parts of the city instead (e.g. Queens)</Text>
            </View>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },
    loader: {
        paddingTop: 100,
    },
    list: {
        marginBottom: 200,
    },
    searchContainer: {
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
        fontFamily: 'raleway-regular'
    },
    wetter: {
        backgroundColor: '#f0e9de',
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 30,
        height: 100
    },
    weatherImage: {
        height: 40
    },
    subHeadings: {
        marginBottom: 10,
        fontFamily: 'libre-regular',
        fontSize: 16,
        color: '#333',
    },
    setFont: {
        fontFamily: 'raleway-regular'
    }
})