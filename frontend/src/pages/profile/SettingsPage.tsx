// external imports
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// internal imports
import { removeToken } from '../../utils';

export function SettingsPage({route, navigation}: any) {

    function handleLogoutButton(event: any) {
        event.preventDefault();
        removeToken();
        navigation.navigate('Auth');
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogoutButton}>
                <Text style={styles.loginText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    loginText: {
        fontWeight: 'bold'
    },
    loginBtn: {
        width: "70%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
});