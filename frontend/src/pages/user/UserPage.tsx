// external imports
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

// internal imports
import { UserInfo } from '../../components';
import { UserNav } from '../../navigation/UserNav';

export function UserPage({route}: any) {
    const userId: string = route.params.userId;
    useEffect(() => {

    }, [userId]);
    
	return (
        <>
            <UserInfo userId={userId} />
            <UserNav userId={userId} />
        </>
	);
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#FFF',
        flex: 1,
        overflow: 'hidden'
    }
});