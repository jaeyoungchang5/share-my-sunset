// external imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// internal imports
import { getUserUsername } from '../../middleware';

export function UserTag({username, userId, navigation}: any) {

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Profile Page', {userId: userId})}
        >
            <Text style={styles.username}>@{username}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    username: {
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});