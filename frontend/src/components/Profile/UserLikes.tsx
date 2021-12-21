import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

export function UserLikes() {
    console.log('User likes');
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>This is user's likes.</Text>
        </View>
    )
}