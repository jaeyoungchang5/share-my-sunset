// external imports
import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, FlatList } from 'react-native';

// internal imports
import { Post } from '../../components/Post';
import { getSunsetIdsByUserId } from '../../middleware';
import { IPostIds } from '../../interfaces';

export function UserPosts({route, navigation}: any) {
    const userId: string = route.params.userId;
    const appUserId: string = route.params.appUserId;
    const [postIds, setPostIds] = useState<IPostIds>();

    useEffect(() => {
        let mounted = true;
		loadPostIds(mounted);

		return function cleanup() {
			mounted = false;
		}
    }, []);

    function loadPostIds(mounted: boolean) {
        getSunsetIdsByUserId(userId)
        .then(res => {
            if (mounted) {
                setPostIds(res);
            }
        })
    }

    function renderItem({ item } : any) {
		return (
			<Post appUserId={appUserId} sunsetId={item._id} userId={userId} navigation={navigation} />
		);
	}
    return (
        <FlatList style={styles.scroll}
			data={postIds?.data}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
		/>
    );
}

const styles = StyleSheet.create({
	container: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
	scroll: {
        backgroundColor: '#FFF',
        flex: 5,
        overflow: 'hidden'
    }
});