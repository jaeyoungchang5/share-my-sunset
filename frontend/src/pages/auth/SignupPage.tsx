// external imports
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, TextInput, TouchableOpacity } from 'react-native'

// internal imports
import { signup } from '../../middleware';
import { getUser } from '../../utils';
import { ISignupCredentials } from '../../interfaces';

export function SignupPage({navigation}: any) {
    const [signupUser, setSignupUser] = useState<ISignupCredentials>({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });

    function handleSignupButton(event: any) {
        event.preventDefault();
        signup(signupUser)
        .then(() => {
            getUser()
            .then((res) => {
                navigation.navigate('App', {appUserId: res.body.userId});
            })
        }).catch(err => {
            // notify user that username has already been taken
        })
    }

    return (
        <View style={styles.container}>
            {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="First name"
                    placeholderTextColor="#003f5c"
                    onChangeText={(firstName) => setSignupUser(prev => {return {...prev, 'firstName': firstName}})}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Last name"
                    placeholderTextColor="#003f5c"
                    onChangeText={(lastName) => setSignupUser(prev => {return {...prev, 'lastName': lastName}})}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Username"
                    placeholderTextColor="#003f5c"
                    onChangeText={(username) => setSignupUser(prev => {return {...prev, 'username': username}})}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 40,
    },

    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    loginText: {
        fontWeight: 'bold'
    },
    loginBtn: {
        width: "70%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
    row: {
        flexDirection: 'row',
        marginTop: 20,
    },
    link: {
        fontWeight: 'bold',
    },
});