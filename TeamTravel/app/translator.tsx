import {View, Text, StyleSheet, TextInput, Button, ActivityIndicator} from "react-native";
import {globalStyles} from "../styles/global";
import {useState} from "react";
import TranslateInput from "../components/translateInput";

type Translation = {
    text: string
}


export default function Translator() {

    const [translation, setTranslation] = useState<Translation[]>([
        {
            text: "Translation will appear here"
        }]);

    /*zeigen, dass daten gerade laden*/
    const [loadingSpinner, setSpinner] = useState(false);
}
//submit aktion für Translate button
const submitHandler = (text: string, src_lang: string, trgt_lang: string) => {

    if (text != "") {
        const origin_text = text;
        console.log(origin_text);

        const source_lang = src_lang;
        console.log(source_lang);

        const target_lang = trgt_lang;
        console.log(target_lang);

        /*show spinner*/
        setSpinner(true);

export default function Translator (){
    //submit aktion für Translate button
    const submitHandler = (text: string) => {
        //übersetzen des Textes

        //Aufruf der Übersetzungs API mit gewählter Sprache

        const getTranslationFromApi = () => {
            return fetch(`https://api-free.deepl.com/v2/translate?auth_key=6b8228fb-b44e-490e-b596-6901359a65ae:fx&text=${origin_text}&source_lang=${source_lang}&target_lang=${target_lang}`)
                .then(response => response.json())
                .then(json => {
                    /* Filtern und Daten setzen mit neuem Wetter */
                    const translationItems = {
                        text: json.translations.text
                    };

                    console.log(translationItems.text);

                    setTranslation([translationItems]);
                })
                .catch(error => {
                    console.error(error);
                });
        };

    }

    return (
        <View style={styles.container}>
            <Text>Translate your text here</Text>
            <TranslateInput submitHandler={submitHandler}/>
            <Text></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
})