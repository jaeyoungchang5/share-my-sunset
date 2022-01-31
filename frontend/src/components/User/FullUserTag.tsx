// external imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// internal imports

export function FullUserTag({username, userId, firstName, lastName, navigation}: any) {

    return (
        <View style={styles.fullUserTag}>
            <TouchableOpacity
                onPress={() => navigation.push('Profile Page', {userId: userId})}
            >
                <Text style={styles.fullUserTagText}>{firstName} {lastName} (@{username})</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    fullUserTag: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        flexDirection: 'row'
    },
    fullUserTagText: {
        fontWeight: 'bold'
    }
});