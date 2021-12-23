// external imports
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// internal imports
import { getSunsetById } from '../../utils';
import { ISunset } from '../../interfaces';

export function Post({sunsetId, navigation}: any) {
    const [sunset, setSunset] = useState<ISunset>();

    useEffect(() => {
        let mounted: boolean = true;
        
		getSunsetById(sunsetId)
        .then(res => {
            if (mounted) {
                setSunset(res);
            }
        })

		return function cleanup() {
			mounted = false;
		}
    }, []);

    function loadSunset(mounted: boolean) {
        getSunsetById(sunsetId)
        .then(res => {
            if (mounted) {
                setSunset(res);
            }
        })
    }

    return (
        <View style={styles.card}>
            <Image style={styles.cardImage} source={{uri: sunset?.data.sunsetImage}}/>
            <View style={styles.cardHeader}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('User Page', {userId: sunset?.data.userId})}
                >
                    <Text style={styles.cardTitle}>@{sunset?.data.userId}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardContent}>
                <Text>{sunset?.data.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 25,
        justifyContent: 'center'
    },
    cardImage: {
        width: '100%',
        height: 300
    },
    cardHeader: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardTitle: {
        fontWeight: 'bold',
    },
    cardAvatar: {
        marginRight: 16
    },
    cardContent: {
        padding: 10,
        borderWidth: 0.25,
        borderColor: 'grey'
    }
});