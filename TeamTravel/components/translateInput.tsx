import {View, Text, StyleSheet, TextInput, Button} from "react-native";
import {globalStyles} from "../styles/global";
import {useState} from "react";

type TranslateProps = {
    submitHandler: (text:string) => void;
}

export default function TranslateInput (props:TranslateProps){
    //const für text in Inputfeld
    const [text, setText] = useState('');


    return(
        <View>
            <View style={styles.searchContainer}>
                <TextInput multiline = {true}
                           numberOfLines = {10} style={globalStyles.translateInput} placeholder={'My text...'}
                           value={text} onChangeText={setText}/>
                <Button  title='Translate' color='#ffc50a' onPress={()=>props.submitHandler(text)}/>
            </View>
            <View>

            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
})