// external imports
import React, { useState } from 'react';
import { Platform, View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useToast } from 'native-base';

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
        alignSelf: 'stretch',
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: 'center'
    },

    TextInput: {
        height: 50,
        flex: 1,
        width: "100%",
        marginLeft: 20,
        padding: 10,
    },

    loginText: {
        fontWeight: 'bold'
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
    row: {
        flexDirection: 'row',
        marginTop: 20,
    },
    link: {
        fontWeight: 'bold',
    },
})