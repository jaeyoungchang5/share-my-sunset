// external imports
import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// internal imports
import { UserLikes } from '../pages/profile/UserLikes';
import { UserPosts } from '../pages/profile/UserPosts';
import { UserFriends } from '../pages/profile/UserFriends';

export function UserNav({userId}: any) {
    const ProfileTab = createMaterialTopTabNavigator();

    return (
        <ProfileTab.Navigator initialRouteName="Posts">
            <ProfileTab.Screen name="Posts" component={UserPosts} initialParams={{userId: userId}} />
            <ProfileTab.Screen name="Likes" component={UserLikes} />
            <ProfileTab.Screen name="Friends" component={UserFriends} initialParams={{userId: userId}}  />
        </ProfileTab.Navigator>
    )
}