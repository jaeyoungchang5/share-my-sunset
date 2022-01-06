// external imports
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getUsersFriendRequests } from '../../middleware';
import { FullUserTag, UserTag } from '../../components';

// internal imports

interface IFriendRequest {
	_id: string,
	requester: string,
}

interface IFriendRequests {
	result: string,
	message: string,
	data: IFriendRequest[],
}

export function NotificationsPage({route, navigation}: any) {
    const appUserId: string = route.params.appUserId;

	const [friendRequests, setFriendRequests] = useState<IFriendRequests>();

	useEffect(() => {
		getUsersFriendRequests(appUserId)
		.then(res => {
			setFriendRequests(res);
		})
	}, []);

	function renderItem({item} : any) {
		return (
			<FullUserTag
				userId={item.requester}
				username={item.requester}
				navigation={navigation}
			/>
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.title}>

				<Text style={styles.titleText}>Friend Requests</Text>
			</View>
			<FlatList
				style={styles.friendRequestsList}
				data={friendRequests?.data}
				renderItem={renderItem}
				keyExtractor={(item) => item._id}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#fff'
	},
	title: {
		padding: 10,
		borderBottomColor: '#000',
		borderBottomWidth: 0.3
	},
	titleText: {
		fontWeight: 'bold',
		fontStyle: 'italic'
	},
	friendRequestsList: { // same as searchList in SearchPage
		flex: 1,
		overflow: 'hidden'
	},
});