import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

import { IUser } from '../../interfaces';

export function UserFriends() {
    console.log('User Friends');
    return (
        <View>
            <Text>This is user's friends.</Text>
        </View>
    )
}