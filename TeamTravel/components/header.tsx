import {View, Text, StyleSheet} from 'react-native';

export default function Header(){
    return(
        <View style={styles.header}>
            <Text style={styles.title}>TeamTravel</Text>
        </View>
    );


}

const styles = StyleSheet.create({
    header: {
        height: 80,
        paddingTop: 38,
        marginTop: 20,
        backgroundColor: '#ffc50a',
    },
    title:{
        textAlign: 'center',
        color: '#191919',
        fontSize: 20,
        fontWeight: 'bold',
    }
});