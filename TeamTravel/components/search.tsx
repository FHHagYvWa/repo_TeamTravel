import {View, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {useState} from "react";
import {globalStyles} from "../styles/global";
import {MaterialIcons} from "@expo/vector-icons";

type SearchSightsProps = {
    submitHandler: (text: string) => void;
    resetHandler: () => void;
}

export default function SearchSights(props: SearchSightsProps) {

    const [text, setText] = useState('');

    // Eingabe löschen, wenn Mülltonnen-Icon geklickt wird
    const handleDelete = () => {
        setText('');
        props.resetHandler();
    };

    return (
        <View>
            <View style={styles.searchBar}>
                <TextInput style={globalStyles.searchInput} placeholder={'Your destination...'}
                           value={text} onChangeText={setText}/>
                <TouchableOpacity onPress={handleDelete}>
                    <MaterialIcons name="delete" size={26} color={'#000'}/>
                </TouchableOpacity>
            </View>
            <Button title='Search' color='#ffc50a' onPress={() => props.submitHandler(text)}/>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: "row",
        alignItems: "center"
    },
});