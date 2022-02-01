// external imports 
import React from 'react';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

// internal imports
import { Upload } from '../../components';

export function UploadPage({route}: any) {
	const appUserId: string = route.params.appUserId;
	
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
			keyboardVerticalOffset={0}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View>
					<Upload appUserId={appUserId} />
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