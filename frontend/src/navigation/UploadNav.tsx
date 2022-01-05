// external imports
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// internal imports
import { UploadPage } from "../pages";

export function UploadNav({route} : any) {
	const userId: string = route.params.userId;
    const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator initialRouteName="Upload Home Screen">
            <Stack.Screen 
                name='Upload Home Screen' 
                component={UploadPage} 
                initialParams={{userId: userId}} 
                options={{
                   headerShown: false
                }} 
            />
        </Stack.Navigator>
    )
}