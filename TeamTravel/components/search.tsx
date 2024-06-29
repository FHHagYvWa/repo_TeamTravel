import {View, TextInput, Button, StyleSheet, Pressable, Text} from 'react-native';
import {useState} from "react";
import {globalStyles} from "../styles/global";


type SearchSightsProps = {
    submitHandler: (text:string) => void;
}

export default function SearchSights(props: SearchSightsProps){

    const [text, setText] = useState('');



    return(
        <View style={styles.searchContainer}>
            <TextInput style={globalStyles.searchInput} placeholder={'Mein Reiseziel...'}
                value={text} onChangeText={setText}/>
            <Button  title='Suchen' color='#ffc50a' onPress={()=>props.submitHandler(text)}/>
        </View>
    );
}

const styles = StyleSheet.create({

});