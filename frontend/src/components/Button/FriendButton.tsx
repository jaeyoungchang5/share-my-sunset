// external imports
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

// internal imports
import { acceptFriendRequest, checkFriendStatus, rejectFriendRequest, removeFriend, sendFriendRequest } from '../../middleware';

interface IStatus {
    index: number,
    name: string,
    style: object,
}

interface IStatusOptions {
    [key: number]: IStatus,
}

interface IFriendButtonProps {
    appUserId: string,
    userId: string,
}

export function FriendButton({ appUserId, userId }: IFriendButtonProps) {
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

    const [friendState, setFriendState] = useState<IStatus>();

    useEffect(() => {
        let mounted = true;
        loadFriendStatus(mounted);

        return function cleanup() {
            mounted = false;
        }
    }, []);

    function loadFriendStatus(mounted: boolean) {
        checkFriendStatus(appUserId, userId)
        .then(res => {
            if (mounted) {
                if (res.status == 'Friends') {
                    setFriendState(statusOptions[3]);
                } else if (res.status == 'Pending') {
                    if (res.data.requester == appUserId && res.data.recipient == userId) {
                        setFriendState(statusOptions[1]);
                    } else if (res.data.recipient == appUserId && res.data.requester == userId) {
                        setFriendState(statusOptions[2]);
                    }
                } else if (res.status == 'None') {
                    setFriendState(statusOptions[0]);
                }
            }
        })
    }

    function handleClick() {
        // requester: appUserId, recipient: userId
        if (friendState?.index == 0) {
            // send friend request
            sendFriendRequest(appUserId, userId)
            .then(res => {
                setFriendState(statusOptions[1]);
            })
        } else if (friendState?.index == 1) {
            // delete friend request
            rejectFriendRequest(appUserId, userId)
            .then(res => {
                setFriendState(statusOptions[0]);
            })
        } else if (friendState?.index == 2) {
            // accept friend request
            acceptFriendRequest(appUserId, userId)
            .then(res => {
                setFriendState(statusOptions[3]);
            })
        } else if (friendState?.index == 3) {
            // remove friend
            removeFriend(appUserId, userId)
            .then(res => {
                setFriendState(statusOptions[0]);
            })
        }
    }

    return (
        <View style={friendState?.style}>
            <TouchableOpacity style={styles.button} onPress={handleClick}>
                <Text style={styles.text}>{friendState?.name}</Text>
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