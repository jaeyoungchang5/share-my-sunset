// external imports
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// internal imports

export function UpdatePasswordPage({route, navigation}: any) {
	const appUserId: string = route.params.appUserId;

    return (
        <View style={styles.container}>
            <Text>Update password page</Text>
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
        marginTop: 40,
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