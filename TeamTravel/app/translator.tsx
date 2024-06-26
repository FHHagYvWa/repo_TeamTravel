import {View, Text, StyleSheet} from "react-native";

export default function Translator (){

    return(
        <View style={styles.container}>
            <Text>Übersetze hier deinen Text</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    }
})