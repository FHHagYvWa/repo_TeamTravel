import {Stack} from "expo-router";

export default function SightsLayout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{
                headerShown: false,
                headerTitle: "Team Travel",
                title: "Sights",
            }}
            />
            <Stack.Screen name="[id]" options={{
                headerTitle: "Sights Details"
            }}/>

        </Stack>
    );
}