import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { IUser } from '../../interfaces';
import { getFeed, getSunsetById } from '../../utils';

export function FeedPage(props: any) {
	const user: IUser = props.route.params.user;
	const [feed, setFeed] = useState([]);

	useEffect(() => {
		loadFeed();
	}, []);

	function loadFeed() {
		getFeed(user._id)
		.then(res => {
			setFeed(res);
			return;
		})
	}

	return (
		<View style={styles.container}>
			<Text>Enjoy your feed!</Text>
			<StatusBar style="auto" />
		</View>
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