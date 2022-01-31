// external imports
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// internal imports
import { removeToken } from '../../utils';

export function SettingsPage({route, navigation}: any) {
	const appUserId: string = route.params.appUserId;

    function handleUpdateProfileButton() {
        navigation.navigate('Update Profile Page', {appUserId: appUserId});
    }

    function handleUpdatePasswordButton() {
        navigation.navigate('Update Password Page', {appUserId: appUserId});
    }

    function handleDeleteProfileButton() {

    }

    function handleLogoutButton(event: any) {
        event.preventDefault();
        removeToken();
        navigation.navigate('Auth');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={handleUpdateProfileButton}>
                <Text style={styles.btnText}>Update your profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={handleUpdatePasswordButton}>
                <Text style={styles.btnText}>Update your password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={handleLogoutButton}>
                <Text style={styles.btnText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteProfileButton}>
                <Text style={styles.deleteBtnText}>Delete account</Text>
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
    btnText: {
        // fontWeight: 'bold'
    },
    btn: {
        width: "70%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        backgroundColor: "#FFC0CB",
    },
    deleteBtn: {
        width: "70%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "red"
    },
    deleteBtnText: {
        fontWeight: 'bold',
        color: 'white'
    }
});