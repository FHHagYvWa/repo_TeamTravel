import {
    View,
    Text,
    StyleSheet,
    Pressable,
    FlatList,
    TouchableOpacity,
    Keyboard,
    SafeAreaView,
    TouchableWithoutFeedback,
} from "react-native";
import {router} from "expo-router";
import {globalStyles} from "../../styles/global";
import {useState} from "react";
import Header from "../../components/header";
import {StatusBar} from "expo-status-bar";

type Sight = {
    title: string,
    description: string,
    key: string
}

export default function HomePage (){

    const [sights, setSight] = useState<Sight[]>([
        {title: "Basilica de la Sagrada Familia", description: "Lovely description", key: "1"},
        {title: "Basilica de la Sagrada Familia", description: "Lovely description number 2", key: "2"},

    ]);
    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <SafeAreaView style={styles.safe}>
                <View style={globalStyles.container}>
                    {/* header rendered through expo navigation*/}

                    <View style={styles.content}>
                        <Text>Welche Stadt möchtest du erkunden?</Text>
                        <StatusBar style="auto" />
                        <FlatList data={sights} renderItem={({item})=>(
                            <TouchableOpacity onPress={()=>router.push({pathname:item.key,params:item})}>

                                    <Text style={globalStyles.titleText}>{item.title}</Text>
                                    <Text style={globalStyles.paragraph}>{item.description}</Text>


                            </TouchableOpacity>
                        )}/>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    safe:{
        flex: 1,
    },
    container: {
        padding: 24,
    },
    content: {
        padding: 20,
    }
})