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
		// getFeed(user._id)
		// .then(res => {
		// 	setFeed(res);
		// 	return;
		// })
		const loadedFeeded: IFeed = {
			"result": "success",
			"message": "Got feed",
			"data": [
				// {
				// 	"_id": "619ee9eb6eb61ae482f595e2",
				// 	"userId": "619ee6a0296e594128b0745a",
				// 	"sunsetImage": "2021-11-25T01:42:03.428ZWorkout.png",
				// 	"description": "Maureen's workout plan",
				// 	"createdAt": "2021-11-25T01:42:03.936Z",
				// 	"updatedAt": "2021-11-25T01:42:03.936Z",
				// 	"__v": 0
				// },
				{
					"_id": "619ee9c36eb61ae482f595dc",
					"userId": "619ee65d296e594128b07458",
					"sunsetImage": "2021-11-25T01:41:20.987ZMe@ND.HEIC",
					"description": "Jae's first day of school",
					"createdAt": "2021-11-25T01:41:23.939Z",
					"updatedAt": "2021-11-25T01:41:23.939Z",
					"__v": 0
				},
				// {
				// 	"_id": "619ee9666eb61ae482f595ac",
				// 	"userId": "619ee65d296e594128b07458",
				// 	"sunsetImage": "2021-11-25T01:39:47.154ZFamily.jpg",
				// 	"description": "Jae's big family pic",
				// 	"createdAt": "2021-11-25T01:39:50.148Z",
				// 	"updatedAt": "2021-11-25T01:39:50.148Z",
				// 	"__v": 0
				// }
			]
		}
		setFeed(loadedFeeded);
	}

	function renderItem({ item } : any) {
		console.log(item)
		return (
			<Sunset />
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