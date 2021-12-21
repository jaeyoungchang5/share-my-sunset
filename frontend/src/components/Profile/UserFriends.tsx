import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView } from 'react-native';

export function UserFriends() {
    console.log('User Friends');
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#03cafc' }}>
                <Text>This is user's friends.</Text>
            </View> 
        </SafeAreaView>
    );
}