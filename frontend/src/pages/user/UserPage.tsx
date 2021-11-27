import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Profile } from '../../components';
import { IUser } from '../../interfaces';

export function UserPage(props: any) {
	const user: IUser = props.route.params.user;
	return (
		<Profile user={user} />
	);
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
	},
});