// external imports
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

// internal imports
import { FullUserTag } from '../../components';
import { getUsersFriends } from '../../middleware/friend.middleware';
import { IFriends } from '../../interfaces';

export function UserFriends({route, navigation}: any) {
    const userId: string = route.params.userId;
    const [friends, setFriends] = useState<IFriends>();
	const [refreshing, setRefreshing] = useState(false);

	const ref = React.useRef(null);
	useScrollToTop(ref);
    
    useEffect(() => {
        let mounted = true;
        loadUsersFriends(mounted);        

        return function cleanup() {
            mounted = false;
        }
    }, [])

    function loadUsersFriends(mounted: boolean) {
        getUsersFriends(userId)
        .then(res => {
            if (mounted) {
                setFriends(res);
            }
        })
    }

    function renderItem({ item } : any) {
		return (
            <FullUserTag
				userId={item._id}
				firstName={item.firstName}
				lastName={item.lastName}
				username={item.username}
				navigation={navigation}
			/>
		);
	}

     function onRefresh() {
		setRefreshing(true);
		setTimeout(() => {
			loadUsersFriends(true);
			setRefreshing(false);
		}, 700)
	}

    return (
        <FlatList 
            style={styles.scroll}
            ref={ref}
            data={friends?.data}
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
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
	scroll: {
        backgroundColor: '#FFF',
        flex: 5,
        overflow: 'hidden'
    }
});