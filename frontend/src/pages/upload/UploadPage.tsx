// external imports 
import React from 'react';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

// internal imports
import { Upload } from '../../components';

export function UploadPage({route}: any) {
	const userId: string = route.params.userId;
	
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View>
					<Upload userId={userId} />
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        backgroundColor: '#ededed'
	}
});