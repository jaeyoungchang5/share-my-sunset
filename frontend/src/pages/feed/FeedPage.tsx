import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { IUser } from '../../interfaces';
import { getFeed, getSunsetById } from '../../utils';
import { Sunset } from '../../components';

interface IFeedItem {
	_id: string,
	userId: string,
	sunsetImage: string,
	description: string,
	createdAt: string,
	updatedAt: string,
	__v: number
}

interface IFeed {
	result: string,
	message: string,
	data: IFeedItem[]
}

export function FeedPage(props: any) {
	const user: IUser = props.route.params.user;
	const [feed, setFeed] = useState<IFeed>();

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

	function renderItem({ item } : any) {
		return (
			<Sunset sunset={item} />
		);
	}

	return (
		<FlatList style={styles.scroll}
			data={feed?.data}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
	},
	scroll: {
        backgroundColor: '#FFF',
        flex: 1,
        overflow: 'hidden'
    }
});