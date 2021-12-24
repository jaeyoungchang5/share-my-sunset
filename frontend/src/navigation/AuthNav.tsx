// external imports
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { LoginPage, SignupPage } from "../pages";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// internal imports

export function AuthNav() {
    const AuthStack = createNativeStackNavigator();
    return (
        <NavigationContainer>
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
        </NavigationContainer>
    )
}