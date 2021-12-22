// external imports
import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, FlatList } from 'react-native';

// internal imports
import { Sunset } from '../Post';
import { getSunsetIdsByUserId } from '../../utils';
import { IPostIds } from '../../interfaces';

export function UserPosts({route}: any) {
    const userId: string = route.params.userId;
    const [postIds, setPostIds] = useState<IPostIds>();

    useEffect(() => {
        loadPostIds();
    }, [userId]);

    function loadPostIds() {
        getSunsetIdsByUserId(userId)
        .then(res => {
            setPostIds(res);
            return;
        })
    }

    function renderItem({ item } : any) {
		return (
			<Sunset sunsetId={item._id} userId={userId} />
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