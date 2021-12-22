// external imports
import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

// internal imports
import { UserInfo } from '../../components';
import { UserNav } from '../../navigation/UserNav';

export function UserPage({route}: any) {
    const userId: string = route.params.userId;
    useEffect(() => {

    }, []);
    
	return (
        <>
            <UserInfo userId={userId}  />
            <UserNav userId={userId} />
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