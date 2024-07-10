import {
    View, Text, StyleSheet, Keyboard, SafeAreaView,
    TouchableWithoutFeedback, ScrollView, TouchableOpacity
} from "react-native";
import {globalStyles} from "../styles/global";
import {useState} from "react";
import TranslateInput from "../components/translateInput";
import * as Speech from 'expo-speech';
import {MaterialIcons} from "@expo/vector-icons";

type Translation = {
    text: string
}

export default function Translator() {
    // const für die Sprache bei Speech
    const [targetLanguage, setTargetLanguage] = useState("EN");

    // const für Speech Ausgabe
    const speak = () => {
        const thingToSay = translation[0].text;
        Speech.speak(thingToSay, {language: targetLanguage});
    };

    // initialen Text setzen
    const [translation, setTranslation] = useState<Translation[]>([
        {
            text: "Translation will appear here"
        }]);

    // zeigen, dass daten gerade laden (loading)
    const [loadingSpinner, setSpinner] = useState(false);

    // submit aktion für Translate button
    const submitHandler = (text: string, src_lang: string, trgt_lang: string) => {

        // wenn textfeld nicht leer ist
        if (text != "") {
            const origin_text = text;
            // console.log(origin_text);

            const source_lang = src_lang;
            // console.log(source_lang);

            const target_lang = trgt_lang;
            // console.log(target_lang);

            // show spinner
            setSpinner(true);

            //target language für speech setzen
            setTargetLanguage(trgt_lang);

            // fetch translation from API
            const getTranslationFromApi = () => {
                return fetch(`https://api-free.deepl.com/v2/translate?auth_key=6b8228fb-b44e-490e-b596-6901359a65ae:fx&text=${origin_text}&source_lang=${source_lang}&target_lang=${target_lang}`)
                    .then(response => response.json())
                    .then(json => {
                        // Daten setzen für Übersetzung
                        const translationText = json.translations[0].text;
                        setTranslation([{text: translationText}]);

                        // console.log(json.translations[0].text);

                    })
                    .catch(error => {
                        console.error(error);
                    });
            };

            getTranslationFromApi().then(translations => {
                console.log(translations[0].text);
            });
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.safe}>
                <ScrollView>
                    <View style={styles.container}>
                        <TranslateInput submitHandler={submitHandler}/>
                        <View style={styles.translateView}>
                            <Text style={globalStyles.titleText}>Your translation:</Text>
                            <TouchableOpacity onPress={speak}>
                                <MaterialIcons name="volume-up" size={48} color={'#ffc50a'}/>
                            </TouchableOpacity>
                            <Text style={styles.translated}>{translation[0].text}</Text>

                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    safe: {
        flex: 1,
    },
    translated: {
        backgroundColor: '#f0e9de',
        padding: 10,
        borderColor: '#ffc50a',
        borderWidth: 2,
        borderRadius: 15,
        marginBottom: 10,
        height: "auto"
    },
    translateView: {
        marginTop: 30
    },
})
