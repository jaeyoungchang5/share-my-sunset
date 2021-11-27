import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

import { IUser } from '../../interfaces';

export function UserLikes() {
    console.log('User likes');
    return (
        <View>
            <Text>This is user's likes.</Text>
        </View>
    )
}