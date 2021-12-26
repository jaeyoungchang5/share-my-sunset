// external imports
import React, { useState, useEffect } from "react";
import { LoginPage, SignupPage } from "../pages";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// internal imports

export function AuthNav() {
    const AuthStack = createNativeStackNavigator();

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