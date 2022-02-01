// external imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// internal imports

export function UserTag({username, userId, navigation}: any) {

    return (
        <View>
            {/* <Text style={styles.name}>{name}</Text> */}
            <TouchableOpacity
                onPress={() => navigation.push('Profile Page', {userId: userId})}
            >
                <Text style={styles.username}>@{username}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    name: {
        paddingTop: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
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