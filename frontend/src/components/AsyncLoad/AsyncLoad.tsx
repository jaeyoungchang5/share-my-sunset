// external imports
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// internal imports
import LottieView from 'lottie-react-native'

export function AsyncLoad() {
    return (
        <LottieView
            source={require('../../../assets/sunset.json')}
            style={styles.lottie}
            autoPlay 
            loop
        />
    )
}

const styles = StyleSheet.create({
    lottie: {
        flex: 1,
        width: '100%',
        height: 300,
    }
});