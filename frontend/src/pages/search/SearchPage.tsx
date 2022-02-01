// external imports
import { Icon, Input } from 'native-base';
import React, { useState, useEffect, Fragment } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { FullUserTag } from '../../components';

// internal imports
import { searchUsers } from '../../middleware';

interface ISearchResult {
	_id: string,
	firstName: string,
	lastName: string,
	username: string,
}

interface ISearchResults {
	result: string,
	data: ISearchResult[],
}

export function SearchPage({route, navigation} : any) {
	const [searchString, setSearchString] = useState<string>('');
	const [searchResults, setSearchResults] = useState<ISearchResults>();

	function loadSearch(query: string) {
		setSearchString(query);
		if (query == '') {
			let nullResults: ISearchResults = {
				result: '',
				data: []
			}
			setSearchResults(nullResults);
			return;
		}

		searchUsers(query)
		.then(res => {
			setSearchResults(res);
		})
	}

	function renderItem({item}: any) {
		return (
			<FullUserTag 
				userId={item._id} 
				username={item.username} 
				firstName={item.firstName} 
				lastName={item.lastName}
				navigation={navigation}
			/>
		)
	}
	return (
		<KeyboardAvoidingView 
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.keyboardAvoid}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					<Input placeholder="Search" width="100%" borderRadius={4} py={3} px={1} fontSize={14}
						InputLeftElement={
							<Ionicons style={styles.icon} name="md-search" size={24} color="black" />
						} 
						onChangeText={(query) => loadSearch(query)}
					/>
					{
						(searchResults?.data && searchResults?.data.length > 0)
						?
						<FlatList
							style={styles.searchList}
							data={searchResults?.data}
							renderItem={renderItem}
							keyExtractor={(item) => item._id}
						/>
						:
						<Fragment></Fragment>
					}
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	keyboardAvoid: {
		flex: 1,
	},
	container: {
        flex: 1,
        backgroundColor: '#FFF'
	},
	icon: {
		marginLeft: 10
	},
	searchBarText: {
		fontSize: 14
	},
	searchList: {
		flex: 1,
		overflow: 'hidden'
	},
	noResult: {
        padding: 10
	}
});