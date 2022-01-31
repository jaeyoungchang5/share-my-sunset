// external imports
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// internal imports
import { ProfilePage, SettingsPage, UpdateProfilePage, UpdatePasswordPage } from "../pages";

export function ProfileNav({route} : any) {
	const appUserId: string = route.params.appUserId;
    const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator initialRouteName="Main Profile Page">
            <Stack.Screen 
                name='Main Profile Page' 
                component={ProfilePage} 
                initialParams={{userId: appUserId, appUserId: appUserId}} 
                options={{
                    headerShown: false
                }} 
            />
            <Stack.Screen 
                name='Profile Page' 
                component={ProfilePage} 
                initialParams={{userId: appUserId, appUserId: appUserId}} 
                options={{
                    headerTitle: '', 
                    headerTransparent: true,
                    headerBackTitleVisible: false
                }} 
            />
            <Stack.Screen 
                name='Update Profile Page'
                component={UpdateProfilePage}
                initialParams={{appUserId: appUserId}}
                options={{
                    headerTitle: '', 
                    headerTransparent: true,
                    headerBackTitleVisible: false
                }} 
            />
            <Stack.Screen 
                name='Update Password Page'
                component={UpdatePasswordPage}
                initialParams={{appUserId: appUserId}}
                options={{
                    headerTitle: '', 
                    headerTransparent: true,
                    headerBackTitleVisible: false
                }} 
            />
            <Stack.Screen 
                name='Settings'
                component={SettingsPage}
                initialParams={{appUserId: appUserId}}
                options={{
                    headerTitle: '', 
                    headerTransparent: true,
                    headerBackTitleVisible: false
                }} 
            />
        </Stack.Navigator>
    )
}