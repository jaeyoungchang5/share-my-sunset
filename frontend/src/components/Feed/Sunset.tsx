import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
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
        <View>
            <Image style={{width: 100, height: 50, borderWidth: 1}} source={{uri: sunset?.data.sunsetImage}}/>
            <Text>{sunset?.data.description}</Text>
            <Text>{sunset?.data.userId}</Text>
        </View>
    );
}