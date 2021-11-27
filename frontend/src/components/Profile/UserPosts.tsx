import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

import { IUser } from '../../interfaces';

export function UserPosts() {
    console.log('User Posts');
    return (
        <View>
            <Text>This is user's posts.</Text>
        </View>
    )
}