// external imports
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

// internal imports
import { IUser } from '../../interfaces';
import { getUserInfo } from '../../utils';

export function UserInfo({userId}: any) {
    const [user, setUser] = useState<IUser>();
    
    useEffect(() => {
        loadUserInfo();
    }, [userId]);

    function loadUserInfo() {
        getUserInfo(userId)
        .then(res => {
            setUser(res.data);
            return;
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.userRow}>
                <View style={styles.userNameRow}>
                    <Text style={styles.userNameText}>{user?.firstName} {user?.lastName}</Text>
                    <Text style={styles.usernameText}>@{user?.username}</Text>
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
        marginLeft: 40,
        marginRight: 40,
    },
    userBioText: {
        color: '#000',
        fontSize: 13.5,
        textAlign: 'center',
    },
});