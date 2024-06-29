import {StyleSheet} from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleText: {
        fontFamily: "libre-regular",
        fontSize: 16,
        color: '#333',
        marginBottom: 2
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#f0e9de',
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: {width: 4, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        marginBottom: 10,
        marginRight: 10
    },
    cardImage: {
       width: "auto",
       height: 80,
        marginBottom: 7
    },
    cardDescription: {
        fontFamily: "Raleway-Italic",
        fontStyle: 'italic'
    }
});


