// external imports
import React, { useState, useEffect } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { UserTag } from '../../components';

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
			<View>
				<Text>{item.firstName} {item.lastName}</Text>
				<UserTag username={item.username} userId={item._id} navigation={navigation} />
			</View>
		)
	}
	return (
		<KeyboardAvoidingView 
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>

			<Searchbar
				placeholder='Search'
				onChangeText={(query) => loadSearch(query)}
				value={searchString}
				autoComplete={true}
				inputStyle={styles.searchBarText}
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
				<Text>No results</Text>
			}

		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
	},
	searchBarText: {
		fontSize: 14
	},
	searchList: {
		flex: 1,
		overflow: 'hidden'
	}
});