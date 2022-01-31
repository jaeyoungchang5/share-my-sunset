// external imports
import React, { useState, useEffect, Fragment } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

// internal imports
import { UserInfo } from './UserInfo';
import { UserNav } from '../../navigation/UserNav';

export function ProfilePage({route, navigation}: any) {
    const userId: string = route.params.userId;
    const appUserId: string = route.params.appUserId;
    
	return (
        <Fragment>
            <UserInfo appUserId={appUserId} userId={userId} route={route} navigation={navigation} />
            <UserNav appUserId={appUserId} userId={userId} navigation={navigation} />
        </Fragment>
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