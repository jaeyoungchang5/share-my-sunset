import React, { useState, useEffect } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { IUser } from '../../interfaces';
import { UserInfo, UserLikes, UserPosts } from './index';
import { UserFriends } from '..';

interface IProfileProps {
    user: IUser
}
interface IProfileTab {
    title: string,
    count: number
}

export function Profile(props: IProfileProps) {
    const [profileTab, setProfileTab] = useState<IProfileTab>();


    const ProfileTab = createMaterialTopTabNavigator();

    const tabs = {
        posts: {
            title: 'Posts',
            count: 12
        },
        likes: {
            title: 'Likes',
            count: 13
        },
        friends: {
            title: 'Friends',
            count: 14
        }
    }

    useEffect(() => {
        setProfileTab(tabs.posts);
    }, []);

    const user: IUser = props.user;
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
            <ProfileTab.Navigator>
                <ProfileTab.Screen name="Posts" component={UserPosts} />
                <ProfileTab.Screen name="Likes" component={UserLikes} />
                <ProfileTab.Screen name="Friends" component={UserFriends} />
            </ProfileTab.Navigator>
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