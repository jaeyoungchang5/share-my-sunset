// external imports
import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

// internal imports
import { UserInfo } from './UserInfo';
import { UserNav } from '../../navigation/UserNav';

export function ProfilePage({route, navigation}: any) {
    const userId: string = route.params.userId;
    
	return (
        <>
            <UserInfo userId={userId} route={route} navigation={navigation} />
            <UserNav userId={userId} navigation={navigation} />
        </>
	);
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#FFF',
        flex: 1
    },
    wrapBox: {
        justifyContent: 'flex-start'
    }
});