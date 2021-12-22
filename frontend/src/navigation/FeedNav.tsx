// external imports
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FeedPage, UserPage } from "../pages";


// internal imports

const Stack = createNativeStackNavigator();

export function FeedNav({route} : any) {
	const userId: string = route.params.userId;
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home Page" component={FeedPage} initialParams={{userId: userId}} />
            <Stack.Screen name="User Page" component={UserPage} initialParams={{userId: userId}} />
        </Stack.Navigator>
    )
}