import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { IUser } from '../../interfaces';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { UserLikes, UserFriends, UserPosts } from '../../components';

const ProfileTab = createMaterialTopTabNavigator();

export function UserNav() {
    return (
        <ProfileTab.Navigator
            initialRouteName="Posts"
        >
            <ProfileTab.Screen name="Posts" component={UserPosts}  />
            <ProfileTab.Screen name="Likes" component={UserLikes} />
            <ProfileTab.Screen name="Friends" component={UserFriends} />
        </ProfileTab.Navigator>
    )
}

interface IProfileTab {
    title: string,
    count: number
}

export function UserPage(props: any) {
	const user: IUser = props.route.params.user;

	return (
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <View style={styles.userRow}>
                    <View style={styles.userNameRow}>
                        <Text style={styles.userNameText}>{user.firstName} {user.lastName}</Text>
                    </View>
                    <View style={styles.userBioRow}>
                        <Text style={styles.userBioText}>{user.bio}</Text>
                    </View>
                </View>
            </View>

            <UserNav />

        </ScrollView>
	);
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#FFF',
    },
	container: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        flex: 1,
        marginBottom: 10,
        marginTop: 45,
    },
    userRow: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 12,
    },
    userNameRow: {
        marginBottom: 10,
    },
    userNameText: {
        color: '#5B5A5A',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    userBioRow: {
        marginLeft: 40,
        marginRight: 40,
    },
    userBioText: {
        color: 'gray',
        fontSize: 13.5,
        textAlign: 'center',
    },
});