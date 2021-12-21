import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { IUser } from '../../interfaces';

export function UserInfo(props: any) {
	const user: IUser = props.initialParams.user;
    return (
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
    )
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#FFF',
        flex: 1,
        overflow: 'hidden'
    },
	container: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        flex: 1,
        marginBottom: 10,
        marginTop: 10,
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