// external imports
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { useToast } from 'native-base';

// internal imports
import { login } from '../../middleware';
import { getUser } from '../../utils';
import { ILoginCredentials } from '../../interfaces';
import { styles } from '../../styles';

export function LoginPage({route, navigation}: any) {
    const [loginUser, setLoginUser] = useState<ILoginCredentials>({
        username: '',
        password: ''
    });

    const toast = useToast();

    function handleLoginButton(event: any) {
        event.preventDefault();

        if (loginUser.username.length == 0 || loginUser.password.length == 0) {
            return toast.show({
                title: 'Please fill out required fields',
                placement: 'top'
            })
        }

        login(loginUser)
        .then(() => {
            getUser()
            .then((res) => {
                navigation.navigate('App', {appUserId: res.body.userId});
            })
        }).catch(err => {
            return toast.show({
                title: 'Login failed',
                placement: 'top'
            })
        })
    }

    return (
        <View style={styles.container}>
            {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}

            {/* <KeyboardAvoidingView style={styles.keyboardAvoid} behavior={"position"} keyboardVerticalOffset={0}> */}
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Username"
                    maxLength={20}
                    placeholderTextColor="#003f5c"
                    autoCapitalize="none"
                    onChangeText={(username) => setLoginUser(prev => {return {...prev, 'username': username}})}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    maxLength={16}
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setLoginUser(prev => {return {...prev, 'password': password}})}
                />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={handleLoginButton}>
                <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>

            <View style={styles.row}>
                <Text>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('Signup Page')}>
                <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
            {/* </KeyboardAvoidingView> */}
        </View>
    )
}