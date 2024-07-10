import {View, Text, StyleSheet, TextInput, Button, TouchableOpacity} from "react-native";
import {globalStyles} from "../styles/global";
import {useState} from "react";
import {Picker} from '@react-native-picker/picker';
import {MaterialIcons} from "@expo/vector-icons";

type TranslateProps = {
    submitHandler: (text: string, src_lang: string, target_lang: string) => void;
}

export default function TranslateInput(props: TranslateProps) {
    // const für text in Inputfeld
    const [text, setText] = useState('');

    //const für select picker der Ausgangssprache
    const [startLanguage, setStartLanguage] = useState("EN");

    //const für select picker der Zielsprache
    const [selectedLanguage, setSelectedLanguage] = useState("ES");

    // Eingabe löschen, wenn Mülltonnen-Icon geklickt wird
    const handleDelete = () => {
        setText('');
    };

    return (
        <View>
            <View>
                <View>
                    <Text style={styles.label}>Translate from:</Text>
                    <View style={styles.pickerStyle}>
                        <Picker
                            selectedValue={startLanguage}
                            onValueChange={(itemValue, itemIndex) =>
                                setStartLanguage(itemValue)
                            }>
                            <Picker.Item label="English" value="EN"/>
                            <Picker.Item label="German" value="DE"/>
                            <Picker.Item label="Spanish" value="ES"/>
                            <Picker.Item label="French" value="FR"/>
                            <Picker.Item label="Italian" value="IT"/>
                        </Picker>
                    </View>
                    <Text style={styles.label}>Translate to:</Text>
                    <View style={styles.pickerStyle}>
                        <Picker
                            selectedValue={selectedLanguage}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedLanguage(itemValue)
                            }>
                            <Picker.Item label="English" value="EN"/>
                            <Picker.Item label="German" value="DE"/>
                            <Picker.Item label="Spanish" value="ES"/>
                            <Picker.Item label="French" value="FR"/>
                            <Picker.Item label="Italian" value="IT"/>
                        </Picker>
                    </View>
                </View>
                <View>
                    <TextInput multiline={true}
                               numberOfLines={5} style={globalStyles.translateInput} placeholder={'Your text...'}
                               value={text} onChangeText={setText}/>
                    <TouchableOpacity onPress={handleDelete}>
                        <MaterialIcons style={globalStyles.icon} name="delete" size={30} color={'#000'}/>
                    </TouchableOpacity>
                    <Button title='Translate' color='#ffc50a'
                            onPress={() => props.submitHandler(text, startLanguage, selectedLanguage)}/>
                </View>
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
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
        fontFamily: 'raleway-regular',
        paddingTop: 10,
    },
})