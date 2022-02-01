// external imports
import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

// internal imports

export function UserLikes() {
	const [refreshing, setRefreshing] = useState(false);
    
	const ref = React.useRef(null);
	useScrollToTop(ref);

    function onRefresh() {
		setRefreshing(true);
		setTimeout(() => {
            // load likes
			setRefreshing(false);
		}, 700)
	}

    return (
        <View style={styles.container}>
            <Text style={{ color: "#000" }}>Coming soon . . .</Text>
        </View> 
    );
}

const styles = StyleSheet.create({
	container: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    }
});