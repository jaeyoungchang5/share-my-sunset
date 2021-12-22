// external imports
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

// internal imports
import { FeedPage, NotificationsPage, PostPage, SearchPage, UserPage } from '../pages';
import { getUserInfo } from '../utils';
import { IUser } from '../interfaces';
import { FeedNav } from './FeedNav';

export function AppNav({userId}: any) {
	const Tab = createBottomTabNavigator(); 

    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        loadUserInfo();
    }, []);

    function loadUserInfo() {
        getUserInfo(userId)
        .then(res => {
            setUser(res.data);
            return;
        })
    }
    
    return (
        <NavigationContainer>
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
                    name='Post' 
                    component={PostPage}
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
                    name='User' 
                    component={UserPage}
                    options={{
                        tabBarIcon: (({focused, color, size}) => {
                            return <FontAwesome name="user" size={size} />
                        }),
                        // title: user?.username
                    }}
                    initialParams={{userId: userId}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}