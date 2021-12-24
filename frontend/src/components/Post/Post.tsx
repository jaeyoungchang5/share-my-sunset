// external imports
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// internal imports
import { getSunsetById } from '../../middleware';
import { ISunset } from '../../interfaces';
import { UserTag } from '../User';

export function Post({sunsetId, navigation}: any) {
    const [sunset, setSunset] = useState<ISunset>();
    const [timeElapsed, setTimeElapsed] = useState<string>();

    useEffect(() => {
        let mounted: boolean = true;
        
		getSunsetById(sunsetId)
        .then(res => {
            if (mounted) {
                setTimeElapsed(calculateTimeElapsed(res.data.createdAt));
                setSunset(res);
            }
        })

		return function cleanup() {
			mounted = false;
		}
    }, []);

    function calculateTimeElapsed(date: Date) {
        let millisecondsElapsed = new Date().getTime() - new Date(date).getTime();
        let seconds = Math.floor(millisecondsElapsed / 1000);
        let minutes = Math.floor(millisecondsElapsed / (1000 * 60));
        let hours = Math.floor(millisecondsElapsed / (1000 * 60 * 60));
        let days = Math.floor(millisecondsElapsed / (1000 * 60 * 60 * 24));
        let months = Math.floor(millisecondsElapsed / (1000 * 60 * 60 * 24 * 30));
        let years = Math.floor(millisecondsElapsed / (1000 * 60 * 60 * 24 * 365));
        if (seconds < 60) return `Seconds ago`;
        else if (minutes < 60) return (minutes == 1) ? `One minute ago` : `${minutes} minutes ago`;
        else if (hours < 24) return (hours == 1) ? `One hour ago` : `${hours} hours ago`;
        else if (days < 30) return (days == 1) ? `One day ago` : `${days} days ago`;
        else if (months < 12) return (months == 1) ? `One month ago` : `${months} months ago`;
        else return (years == 1) ? `One year ago` : `${years} years ago`;
    }

    return (
        <View style={styles.post}>
            <Image style={styles.postImage} source={{uri: sunset?.data.sunsetImage}}/>
            <View style={styles.postContent}>
                <UserTag userId={sunset?.data.userId} navigation={navigation} />
                <Text>{sunset?.data.description}</Text>
                <Text style={styles.date}>{timeElapsed}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    post: {
        marginBottom: 25,
        justifyContent: 'center',
        borderBottomWidth: 0.25,
        borderBottomColor: 'grey'
    },
    postAvatar: {
        marginRight: 16
    },
    postImage: {
        width: '100%',
        height: 300
    },
    postContent: {
        paddingBottom: 10,
        paddingLeft: 10
    },
    date: {
        paddingTop: 5,
        fontStyle: 'italic',
        color: 'gray'
    }
});