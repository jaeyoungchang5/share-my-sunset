// external imports
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useToast } from 'native-base';

// internal imports
import { IUserPasswordInfo } from '../../interfaces';
import { updateUserPassword } from '../../middleware';

export function UpdatePasswordPage({route, navigation}: any) {
	const appUserId: string = route.params.appUserId;
    const [userInfo, setUserInfo] = useState<IUserPasswordInfo>({
        oldPassword: '',
        newPassword: '',
    });

    const toast = useToast();

    function handleUpdateButton() {
        if (userInfo.oldPassword.length == 0 || userInfo.newPassword.length == 0) {
            return toast.show({
                title: 'Please fill out required fields',
                placement: 'top'
            })
        }

        updateUserPassword(appUserId, userInfo)
        .then(res => {
            navigation.navigate('Main Profile Page', {appUserId: appUserId});
        }).catch(err => {
            return toast.show({
                title: 'Password update unsuccessful',
                placement: 'top'
            })
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Old password</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder='Old password'
                    maxLength={16}
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(oldPassword) => setUserInfo(prev => {return {...prev, 'oldPassword': oldPassword}})}
                />
            </View>
            <Text style={styles.text}>New password</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder='New password'
                    maxLength={16}
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(newPassword) => setUserInfo(prev => {return {...prev, 'newPassword': newPassword}})}
                />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={handleUpdateButton}>
                <Text style={styles.loginText}>Update password</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
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
        alignItems: 'flex-start'
    }
});