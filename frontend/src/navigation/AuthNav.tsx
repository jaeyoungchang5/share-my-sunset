// external imports
import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { LoginPage, SignupPage } from "../pages";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// internal imports
import { getUser } from '../utils';

export function AuthNav({navigation}: any) {
    const AuthStack = createNativeStackNavigator();

    async function loadUser() {
		const res = await getUser();
		if (res) {
			navigation.navigate('App', {userId: res.body.userId});
		}
		return res;
	}

	useEffect(() => {
		loadUser();
	}, []);

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen 
                name='Login Page'
                component={LoginPage}
                options={{
                    headerShown: false
                }}
            />
            <AuthStack.Screen 
                name='Signup Page'
                component={SignupPage}
                options={{
                    headerShown: false
                }}
            />
        </AuthStack.Navigator>
    )
}