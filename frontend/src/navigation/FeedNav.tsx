// external imports
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FeedPage, ProfilePage } from "../pages";

// internal imports

export function FeedNav({route} : any) {
	const userId: string = route.params.userId;
    const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Home Page' 
                component={FeedPage} 
                initialParams={{userId: userId}} 
                options={{headerShown: false}} 
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