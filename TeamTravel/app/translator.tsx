import {View, Text, StyleSheet, TextInput, Button} from "react-native";
import {globalStyles} from "../styles/global";
import {useState} from "react";
import TranslateInput from "../components/translateInput";


export default function Translator (props:TranslateProps){
    //submit aktion für Translate button
    const submitHandler = (text: string) => {
        //übersetzen des Textes

        //Aufruf der Übersetzungs API mit gewählter Sprache


    }

    return(
        <View style={styles.container}>
            <Text>Translate your text here</Text>
            <TranslateInput submitHandler={submitHandler}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
})