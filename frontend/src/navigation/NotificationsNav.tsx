// external imports
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// internal imports
import { ProfilePage, NotificationsPage } from "../pages";

export function NotificationsNav({route} : any) {
	const appUserId: string = route.params.appUserId;
    const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator initialRouteName="Notifications-Home">
            <Stack.Screen 
                name='Notifications-Home' 
                component={NotificationsPage} 
                initialParams={{appUserId: appUserId}} 
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
        </Stack.Navigator>
    )
}