// external imports
import React, { useState, useEffect } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useToast } from 'native-base';

// internal imports
import { IUserGeneralInfo } from '../../interfaces';
import { getUserInfo, updateUserInfo } from '../../middleware';

export function UpdateProfilePage({route, navigation}: any) {
	const appUserId: string = route.params.appUserId;
    const [userInfo, setUserInfo] = useState<IUserGeneralInfo>({
        firstName: '',
        lastName: '',
        username: '',
        bio: '',
    });

    const toast = useToast();

    function handleUpdateButton() {

        if (userInfo.firstName.length == 0 || userInfo.lastName.length == 0 || userInfo.username.length == 0) {
            return toast.show({
                title: 'Please fill out required fields',
                placement: 'top'
            })
        }

        updateUserInfo(appUserId, userInfo)
        .then(res => {
            navigation.navigate('Main Profile Page', {appUserId: appUserId})
        }).catch(err => {
            return toast.show({
                title: 'No info was updated',
                placement: 'top'
            })
        })
    }

    function loadUserInfo(mounted: boolean) {
        getUserInfo(appUserId)
        .then(res => {
            if (mounted) {
                setUserInfo(res.data);
            }
        })
    }

    useEffect(() => {
        let mounted = true;
		loadUserInfo(mounted);

		return function cleanup() {
			mounted = false;
		}
    }, []);

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoid}
            keyboardVerticalOffset={0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            value={userInfo.firstName}
                            placeholder="First name"
                            placeholderTextColor="#003f5c"
                            maxLength={20}
                            autoCapitalize='words'
                            onChangeText={(firstName) => setUserInfo(prev => {return {...prev, 'firstName': firstName}})}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            value={userInfo.lastName}
                            placeholder="Last name"
                            placeholderTextColor="#003f5c"
                            maxLength={20}
                            autoCapitalize='words'
                            onChangeText={(lastName) => setUserInfo(prev => {return {...prev, 'lastName': lastName}})}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            value={userInfo.username}
                            placeholder="Username"
                            placeholderTextColor="#003f5c"
                            maxLength={20}
                            autoCapitalize="none"
                            onChangeText={(username) => setUserInfo(prev => {return {...prev, 'username': username}})}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            value={userInfo.bio}
                            placeholder="Bio"
                            placeholderTextColor="#003f5c"
                            maxLength={40}
                            onChangeText={(bio) => setUserInfo(prev => {return {...prev, 'bio': bio}})}
                        />
                    </View>

                    <TouchableOpacity style={styles.loginBtn} onPress={handleUpdateButton}>
                        <Text style={styles.loginText}>Update info</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    keyboardAvoid: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    btnText: {
        // fontWeight: 'bold'
    },
    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    row: {
        flexDirection: 'row',
        marginTop: 20,
    },
    TextInput: {
        height: 50,
        flex: 1,
        width: "100%",
        padding: 10,
        marginLeft: 20
    },
    loginText: {
        color: 'white'
    },
    loginBtn: {
        width: "40%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    }, 
    btn: {
        width: "70%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FFC0CB",
    },
    text: {
        // alignItems: 'flex-start'
    }
});