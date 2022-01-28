// external imports
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';

// internal imports
import { IFeed } from '../../interfaces';
import { getFeed } from '../../middleware';
import { Post } from '../../components';


export function FeedPage({route, navigation} : any) {
	const appUserId: string = route.params.appUserId;
	const [feed, setFeed] = useState<IFeed>();
	const [refreshing, setRefreshing] = useState(false);
	
	useEffect(() => {
		loadFeed();
	}, []);

	function loadFeed() {
		getFeed(appUserId)
		.then(res => {
			setFeed(res);
		})
	}

	function renderItem({ item } : any) {
		return (
			<Post sunsetId={item._id} navigation={navigation} />
		);
	}

	function onRefresh() {
		setRefreshing(true);
		setTimeout(() => {
			loadFeed();
			setRefreshing(false);
		}, 700)
	}

	return (
		<FlatList style={styles.scroll}
			data={feed?.data}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
			refreshing={refreshing}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={onRefresh}
				/>
			}
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