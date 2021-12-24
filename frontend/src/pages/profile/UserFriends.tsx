// external imports
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

// internal imports
import { UserTag } from '../../components';
import { getUsersFriends } from '../../middleware/friend.middleware';
import { IFriends } from '../../interfaces';

export function UserFriends({route, navigation}: any) {
    const userId: string = route.params.userId;
    const [friends, setFriends] = useState<IFriends>();
    
    useEffect(() => {
        let mounted = true;
        getUsersFriends(userId)
        .then(res => {
            if (mounted) {
                setFriends(res);
            }
        })

        return function cleanup() {
            mounted = false;
        }
    }, [])

    function renderItem({ item } : any) {
		return (
			<UserTag userId={item} navigation={navigation} />
		);
	}
    return (
        <FlatList style={styles.scroll}
            data={friends?.data.friends}
            renderItem={renderItem}
            keyExtractor={(item) => item}
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