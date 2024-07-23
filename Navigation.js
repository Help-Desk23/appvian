import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//Pantallas
import HomeScreem from "./routes/HomeScreem";
import SettingScreem from "./routes/SettingScreem";

const Tab = createBottomTabNavigator();

 export default function MyTabs() {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreem} />
            <Tab.Screen name="Setting" component={SettingScreem} />
        </Tab.Navigator>
    )
}


