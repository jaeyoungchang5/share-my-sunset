// external imports
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

// internal imports
import { } from '../../middleware';

interface IStatus {
    index: number,
    name: string,
    style: object,
}

interface IStatusOptions {
    [key: number]: IStatus,
}

interface IFriendButtonProps {
    buttonStatus: number,
}

export function FriendButton({ buttonStatus }: IFriendButtonProps) {
    const statusOptions: IStatusOptions = {
        0: {
            index: 0,
            name: 'Follow',
            style: styles.blueContainer
        },
        1: {
            index: 1,
            name: 'Requested',
            style: styles.greyContainer
        },
        2: {
            index: 2,
            name: 'Accept',
            style: styles.greyContainer
        },
        3: {
            index: 3,
            name: 'Friends',
            style: styles.greenContainer
        },
    }

    const [friendState, setFriendState] = useState<IStatus>(statusOptions[buttonStatus]);

    function handleClick() {
        if (friendState.index == 0) {
            setFriendState(statusOptions[1]);
        } else if (friendState.index == 1) {
            setFriendState(statusOptions[0]);
        } else if (friendState.index == 2) {
            setFriendState(statusOptions[3]);
        } else if (friendState.index == 3) {
            setFriendState(statusOptions[0]);
        }
    }

    return (
        <View style={friendState.style}>
            <TouchableOpacity style={styles.button} onPress={handleClick}>
                <Text style={styles.text}>{friendState.name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    blueContainer: {
        backgroundColor: 'blue',
        width: 100
    },
    greyContainer: {
        backgroundColor: 'grey',
        width: 100
    },
    greenContainer: {
        backgroundColor: 'green',
        width: 100
    },
    text: {
        color: 'white'
    },
    button: {
        height: 30,
        alignItems: "center",
        justifyContent: "center"
    },
});