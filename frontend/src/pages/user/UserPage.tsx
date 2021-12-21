import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IUser } from '../../interfaces';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { UserInfo, UserLikes, UserFriends, UserPosts } from '../../components';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const UserStack = createNativeStackNavigator();
const ProfileTab = createMaterialTopTabNavigator();

function UserNav() {
    return (
        <ProfileTab.Navigator
            initialRouteName="Posts"
        >
            <ProfileTab.Screen name="Posts" component={UserPosts} />
            <ProfileTab.Screen name="Likes" component={UserLikes} />
            <ProfileTab.Screen name="Friends" component={UserFriends} />
        </ProfileTab.Navigator>
    )
}

export function UserPage(props: any) {
	const user: IUser = props.route.params.user;
	return (
        <>
            <UserInfo initialParams={{user: user}} />
            <UserNav />
        </>
	);
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#FFF',
        flex: 1,
        overflow: 'hidden'
    }
});