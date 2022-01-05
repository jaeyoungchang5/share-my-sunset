// external imports
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

// internal imports
import { NotificationsPage, SearchPage } from '../pages';
import { FeedNav } from './FeedNav';
import { ProfileNav } from './ProfileNav';
import { UploadNav } from './UploadNav';

export function AppNav({route}: any) {
    const userId: string = route.params.userId;
	const Tab = createBottomTabNavigator(); 
    
    return (
        <Tab.Navigator initialRouteName='Feed'>
            <Tab.Screen 
                name='Feed' 
                component={FeedNav}
                options={{
                    tabBarIcon: (({focused, color, size}) => {
                        return <MaterialIcons name="home-filled" size={size} />
                    })
                }}
                initialParams={{userId: userId}}
            />
            <Tab.Screen 
                name='Search' 
                component={SearchPage}
                options={{
                    tabBarIcon: (({focused, color, size}) => {
                        return <Ionicons name="search-sharp" size={size} />
                    })
                }}
                initialParams={{userId: userId}}
            />
            <Tab.Screen 
                name='Upload' 
                component={UploadNav}
                options={{
                    tabBarIcon: (({focused, color, size}) => {
                        return <MaterialIcons name="add-circle" size={size} />
                    })
                }}
                initialParams={{userId: userId}}
            />
            <Tab.Screen 
                name='Notifications' 
                component={NotificationsPage}
                options={{
                    tabBarIcon: (({focused, color, size}) => {
                        return <Ionicons name="notifications" size={size} />
                    })
                }}
                initialParams={{userId: userId}}
            />
            <Tab.Screen 
                name='Profile' 
                component={ProfileNav}
                options={{
                    tabBarIcon: (({focused, color, size}) => {
                        return <FontAwesome name="user" size={size} />
                    })
                }}
                initialParams={{userId: userId}}
            />
        </Tab.Navigator>
    )
}