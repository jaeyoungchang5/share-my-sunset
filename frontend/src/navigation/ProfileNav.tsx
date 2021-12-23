// external imports
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfilePage } from "../pages";


// internal imports

const Stack = createNativeStackNavigator();

export function ProfileNav({route} : any) {
	const userId: string = route.params.userId;
    
    return (
        <Stack.Navigator>
            <Stack.Screen name='User Page' component={ProfilePage} initialParams={{userId: userId}} />
        </Stack.Navigator>
    )
}