// external imports
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// internal imports
import { UserTag } from './UserTag';
import { getUserUsername } from '../../middleware';

export function Friend({userId, navigation}: any) {
    const [username, setUsername] = useState<string>();
    useEffect(() => {
        let mounted: boolean = true;

        getUserUsername(userId)
        .then(res => {
            if (mounted) {
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