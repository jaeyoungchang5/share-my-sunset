// external imports
import React, { useState, useEffect, Fragment } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// internal imports
import { IUser } from '../../interfaces';
import { getUserInfo, checkFriendStatus } from '../../middleware';
import { FriendButton } from '../../components';
import { getUser } from '../../utils';

export function UserInfo({route, navigation, appUserId, userId}: any) {
    const [user, setUser] = useState<IUser>();

    const navigationPage: string = route.name;
    
    useEffect(() => {
        let mounted = true;
		loadUserInfo(mounted);

		return function cleanup() {
			mounted = false;
		}
    }, []);

    function loadUserInfo(mounted: boolean) {
        getUserInfo(userId)
        .then(res => {
            if (mounted) {
                setUser(res.data);
            }
        })
    }

    return (
        <View style={styles.container}>
            {
                (navigationPage == 'Main Profile Page' && appUserId == userId)
                ? 
                <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings', {userId: userId})}>
                    <Ionicons name="ios-settings" size={28} color="black" />
                </TouchableOpacity>
                :
                <Fragment></Fragment>
            }
            <View style={styles.userRow}>
                <View style={styles.userNameRow}>
                    <Text style={styles.userNameText}>{user?.firstName} {user?.lastName}</Text>
                    <Text style={styles.usernameText}>@{user?.username}</Text>
                </View>
                <View>
                    {
                        (appUserId != userId)
                        ? 
                        <FriendButton appUserId={appUserId} userId={userId} />
                        :
                        <Fragment></Fragment>
                    }
                </View>
                <View style={styles.userBioRow}>
                    <Text style={styles.userBioText}>{user?.bio}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingBottom: 10,
        paddingTop: 10,
        height: '20%',
    },
    settingsButton: {
        alignSelf: 'flex-end',
        marginTop: 10,
        paddingRight: 10,
        position: 'absolute'
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
        color: '#000',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    usernameText: {
        color: '#000',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    userBioRow: {
        marginTop: 10,
        marginLeft: 40,
        marginRight: 40,
    },
    userBioText: {
        color: '#000',
        fontSize: 13.5,
        textAlign: 'center',
    },
});