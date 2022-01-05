// external imports
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// internal imports
import { ProfilePage, SettingsPage } from "../pages";

export function ProfileNav({route} : any) {
	const userId: string = route.params.userId;
    const Stack = createNativeStackNavigator();
    
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
            <Stack.Screen 
                name='Settings'
                component={SettingsPage}
                initialParams={{userId: userId}}
                options={{
                    headerTitle: 'Settings', 
                    headerTransparent: true,
                    headerBackTitleVisible: false
                }} 
            />
        </Stack.Navigator>
    )
}