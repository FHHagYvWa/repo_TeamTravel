import {View, Text, StyleSheet, TextInput, Button} from "react-native";
import {globalStyles} from "../styles/global";
import {useState} from "react";
import {Picker} from '@react-native-picker/picker';

type TranslateProps = {
    submitHandler: (text:string) => void;
    submitHandler: (src_lang:string) => void;
    submitHandler: (target_lang:string) => void;
}

export default function TranslateInput (props:TranslateProps){
    //const für text in Inputfeld
    const [text, setText] = useState('');


    //const für select picker der Ausgangssprache
    const [startLanguage, setStartLanguage] = useState(null);

    //const für select picker der Zielsprache
    const [selectedLanguage, setSelectedLanguage] = useState();


    return(
        <View>
            <View style={styles.searchContainer}>

                <View>
                    <View style={styles.pickerStyle}>
                        <Picker
                            selectedValue={startLanguage}
                            onValueChange={(itemValue, itemIndex) =>
                                setStartLanguage(itemValue)
                            }>
                            <Picker.Item label="English" value="English" />
                            <Picker.Item label="German" value="German" />
                            <Picker.Item label="Spanish" value="Spanish" />
                            <Picker.Item label="French" value="French" />
                            <Picker.Item label="Italian" value="Italian" />
                        </Picker>
                    </View>
                    <View style={styles.pickerStyle}>
                        <Picker
                            selectedValue={selectedLanguage}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedLanguage(itemValue)
                            }>
                            <Picker.Item label="English" value="English" />
                            <Picker.Item label="German" value="German" />
                            <Picker.Item label="Spanish" value="Spanish" />
                            <Picker.Item label="French" value="French" />
                            <Picker.Item label="Italian" value="Italian" />
                        </Picker>
                    </View>

                </View>

                <TextInput multiline = {true}
                           numberOfLines = {10} style={globalStyles.translateInput} placeholder={'My text...'}
                           value={text} onChangeText={setText}/>
                <Button  title='Translate' color='#ffc50a' onPress={()=>props.submitHandler(text, startLanguage, selectedLanguage)}/>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    pickerStyle: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ffc50a',
        borderRadius: 5,
        backgroundColor: '#fff',
    },


    pickerWrapper: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
    }
})