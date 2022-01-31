// external imports
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useToast } from 'native-base';

// internal imports
import { signup } from '../../middleware';
import { getUser } from '../../utils';
import { ISignupCredentials } from '../../interfaces';
import { styles } from './../../styles';

export function SignupPage({navigation}: any) {
    const [signupUser, setSignupUser] = useState<ISignupCredentials>({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });

    const toast = useToast();

    function handleSignupButton(event: any) {
        event.preventDefault();

        if (signupUser.firstName.length == 0 || signupUser.lastName.length == 0 ||
            signupUser.username.length == 0 || signupUser.password.length == 0) {
            return toast.show({
                title: 'Please fill out required fields',
                placement: 'top'
            })
        }

        signup(signupUser)
        .then(() => {
            getUser()
            .then((res) => {
                navigation.navigate('App', {appUserId: res.body.userId});
            })
        }).catch(err => {
            return toast.show({
                title: 'Signup failed',
                description: 'Username already taken.',
                placement: 'top'
            })
        })
    }

    return (
        <View style={styles.container}>
            {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="First name"
                    maxLength={20}
                    placeholderTextColor="#003f5c"
                    autoCapitalize='words'
                    onChangeText={(firstName) => setSignupUser(prev => {return {...prev, 'firstName': firstName}})}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Last name"
                    maxLength={20}
                    placeholderTextColor="#003f5c"
                    autoCapitalize='words'
                    onChangeText={(lastName) => setSignupUser(prev => {return {...prev, 'lastName': lastName}})}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Username"
                    maxLength={20}
                    placeholderTextColor="#003f5c"
                    autoCapitalize="none"
                    onChangeText={(username) => setSignupUser(prev => {return {...prev, 'username': username}})}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    maxLength={16}
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setSignupUser(prev => {return {...prev, 'password': password}})}
                />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={handleSignupButton}>
                <Text style={styles.loginText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.row}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('Login Page')}>
                <Text style={styles.link}>Log in</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}