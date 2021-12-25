// external imports
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getUserUsername } from '../../middleware';

// internal imports
import { UserTag } from './UserTag';

export function Friend({userId, navigation}: any) {
    const [username, setUsername] = useState<string>();
    useEffect(() => {
        let mounted: boolean = true;

        getUserUsername(userId)
        .then(res => {
            if (mounted) {
                console.log('here');
                setUsername(res.data.username);
            }
        })


		return function cleanup() {
			mounted = false;
		}
    }, []);
    return (
        <UserTag userId={userId} username={username} navigation={navigation} />
    )
}