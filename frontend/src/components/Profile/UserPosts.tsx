import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { Sunset } from '../Feed';
import { getSunsetIdsByUserId } from '../../utils';

interface IPostIds {
    result: string,
    message: string,
    data: {
        _id: string
    }[]
}

export function UserPosts(props: any) {
    const userId: string = props.route.params.userId;
    const [postIds, setPostIds] = useState<IPostIds>();

    useEffect(() => {
        loadPostIds();
    }, []);

    function loadPostIds() {
        getSunsetIdsByUserId(userId)
        .then(res => {
            setPostIds(res);
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
        flex: 1,
        overflow: 'hidden'
    }
});