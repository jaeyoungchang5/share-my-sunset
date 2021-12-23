// external imports
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

// internal imports
import { IFeed } from '../../interfaces';
import { getFeed } from '../../middleware';
import { Post } from '../../components';


export function FeedPage({route, navigation} : any) {
	const userId: string = route.params.userId;
	const [feed, setFeed] = useState<IFeed>();
	
	useEffect(() => {
		let mounted = true;
		loadFeed(mounted);

		return function cleanup() {
			mounted = false;
		}
	}, []);

	function loadFeed(mounted: boolean) {
		getFeed(userId)
		.then(res => {
			if (mounted) {
				setFeed(res);
			}
		})
	}

	function renderItem({ item } : any) {
		return (
			<Post sunsetId={item._id} navigation={navigation} />
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