// external imports
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// internal imports
import { AsyncLoad } from '../../components';
import { getUser } from '../../utils';

export function AppLoadingPage ({navigation}: any) {

    async function loadUser() {
		const res = await getUser();
		if (res) {
			navigation.navigate('App', {appUserId: res.body.userId});
		} else {
            navigation.navigate('Auth');
        }
		return res;
	}

	useEffect(() => {
		loadUser();
	}, []);
    
    return (
        <SafeAreaProvider>
        <View style={styles.app_loading}>
            <AsyncLoad />
        </View>

        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    app_loading: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    }
})