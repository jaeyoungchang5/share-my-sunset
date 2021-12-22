import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getSunsetById } from '../../utils';

interface ISunset {
    result: string,
    message: string,
    data: {
        userId: string,
        description: string,
        sunsetImage: string
    }
}

export function Sunset(props: any) {
    const [sunset, setSunset] = useState<ISunset>();

    useEffect(() => {
        loadSunset();
    }, []);

    function loadSunset() {
        getSunsetById(props.sunset._id)
        .then(res => {
            setSunset(res);
            return;
        })
    }

    return (
        <View style={styles.card}>
            <Image style={styles.cardImage} source={{uri: sunset?.data.sunsetImage}}/>
            <View style={styles.cardHeader}>
                <TouchableOpacity
                    // onPress={() => props.navigation.navigate('Profile')}
                >
                    <Text style={styles.cardTitle}>{sunset?.data.userId}</Text>
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
        // color: theme['color-basic-1000']
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