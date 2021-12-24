// external imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// internal imports
import { getUserUsername } from '../../middleware';

export function UserTag({userId, navigation}: any) {
    // const [username, setUsername] = useState<any>();

    // useEffect(() => {
    //     let mounted = true;
    //     getUserUsername(userId)
    //     .then(res => {
    //         if (mounted) {
    //             setUsername(res);
    //         }
    //     })

    //     return function cleanup() {
    //         mounted = false;
    //     }
    // }, [])


    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Profile Page', {userId: userId})}
        >
            <Text style={styles.username}>@{userId}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    username: {
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});