// external imports
import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// internal imports
import { UserLikes, UserFriends, UserPosts } from '../components';

export function UserNav({userId}: any) {
    const ProfileTab = createMaterialTopTabNavigator();

    useEffect(() => {

    }, []);

    return (
        <ProfileTab.Navigator initialRouteName="Posts">
            <ProfileTab.Screen name="Posts" component={UserPosts} initialParams={{userId: userId}} />
            <ProfileTab.Screen name="Likes" component={UserLikes} />
            <ProfileTab.Screen name="Friends" component={UserFriends} />
        </ProfileTab.Navigator>
    )
}