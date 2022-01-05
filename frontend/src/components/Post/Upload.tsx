// external imports
import React, { useEffect, useState } from 'react';
import { Image, View, TextInput, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'

// internal imports
import { IShareSunsetInfo } from '../../interfaces';
import { shareSunset } from '../../middleware';

export function Upload({appUserId}: any) {
	const [image, setImage] = useState<Blob>();
	const [imageUri, setImageUri] = useState<string>();
	const [b64Image, setB64Image] = useState<string>();
	const [caption, setCaption] = useState<string>('');

	async function addImage() {
		let _image = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [3,3],
			quality: 1,
			base64: true,
		});

		if (!_image.cancelled) {
			console.log('setting imguri');
			setImageUri(_image.uri);

			fetchImageFromUri(_image.uri)
			.then(img => {
				setImage(img)
			})
		}
	}

	async function fetchImageFromUri(uri: string) {
		const response = await fetch(Platform.OS === 'ios' ? uri.replace('file://', '') : uri);
		// const response = await fetch(uri);
		const blob = await response.blob();
		return blob;
	};

	function handleUpload(event: any) {
		event.preventDefault();
		if (!image) {
			return;
		}

		let sunset: IShareSunsetInfo = {
			userId: appUserId,
			description: caption,
			sunsetImage: image
		}

		console.log('attempting to upload');

		// shareSunset(sunset)
		// .then(res => {
		// 	console.log('share sunset post');
		// 	console.log(res)
		// })

	}
	
	return (
		<View style={styles.container}>
			<View style={styles.uploadBtnContainer}>
				<TouchableOpacity onPress={addImage} style={styles.uploadBtn} >
					{
						imageUri ?
						<Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} /> 
						:
						<View style={styles.uploadBtn}>
							<Text>Upload Image</Text>
							<AntDesign name="camera" size={20} color="black" />
						</View>
					}
					
				</TouchableOpacity>
			</View>
			<View style={styles.captionContainer}>
				<TextInput 
					multiline={true}
					textAlignVertical='top'
					textAlign='left'
					maxLength={100}
					style={styles.caption}
					placeholder='Write a caption here' 
					onChangeText={(caption) => setCaption(caption)}
				/>
			</View>

			<TouchableOpacity style={styles.postBtn} onPress={handleUpload}>
                <Text style={styles.postBtnText}>Share</Text>
            </TouchableOpacity>
		</View>

	);
}

const styles = StyleSheet.create({
	container:{ 
		margin: 25,
		// backgroundColor: 'grey',
		alignItems: 'center',
	},
	uploadBtnContainer:{
		// backgroundColor:'lightgrey',
		borderWidth: 0.25,
		height: 350,
		width: 350,
		justifyContent: 'center'
	},
	uploadBtn:{
		alignItems: 'center'
	},
	captionContainer: {
		// backgroundColor: 'red'
		// marginTop: 20,
		// borderWidth: 0.25,
		// width: 350,
	},
	caption: {
		width: 350,
		height: 125,
		// borderWidth: 0.25,
		// backgroundColor: 'lightgrey'
	},
	postBtnText: {
        fontWeight: 'bold'
    },
    postBtn: {
        width: "50%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "lightblue",
    },
})