import {SplashScreen, Tabs} from "expo-router";
import {useFonts} from "expo-font";
import {useEffect} from "react";
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
    const [loaded, error] = useFonts({
        'libre-regular':require('../assets/fonts/LibreBaskerville-Regular.ttf'),
        'raleway-regular':require('../assets/fonts/Raleway-Regular.ttf'),
        'raleway-italic':require('../assets/fonts/Raleway-Italic.ttf'),
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <TabsLayout />;
}
function TabsLayout() {
    return (
        <Tabs screenOptions={{
            headerStyle: {
                backgroundColor: '#ffc50a',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                headerTitleAlign: 'center'
            },
            tabBarActiveTintColor: '#ffc50a',
            tabBarInactiveTintColor: '#333',
        }}>
            <Tabs.Screen name="(sights)" options={{
                headerTitle: "TeamTravel",
                title: "Sehenswürdigkeiten",
                tabBarIcon: ({color}) =><FontAwesome name="home" size={28} color={color}/>
            }}/>
            <Tabs.Screen name="translator" options={{
                headerTitle: "Translation",
                title: "Übersetzer",
                tabBarIcon: ({color}) =><MaterialIcons name="translate" size={28} color={color}/>
            }}/>
        </Tabs>
    )
}