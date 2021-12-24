// external imports
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfilePage } from "../pages";

// internal imports

const Stack = createNativeStackNavigator();

export function ProfileNav({route} : any) {
	const userId: string = route.params.userId;
    
    return (
        <Stack.Navigator initialRouteName="Main Profile Page">
            <Stack.Screen 
                name='Main Profile Page' 
                component={ProfilePage} 
                initialParams={{userId: userId}} 
                options={{
                    headerShown: false
                }} 
            />
            <Stack.Screen 
                name='Profile Page' 
                component={ProfilePage} 
                initialParams={{userId: userId}} 
                options={{
                    headerTitle: '', 
                    headerTransparent: true,
                    headerBackTitleVisible: false
                }} 
            />
        </Stack.Navigator>
    )
}