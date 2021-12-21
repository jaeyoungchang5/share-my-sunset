import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';

export function UserLikes() {
    return (
        <View style={styles.container}>
            <Text style={{ color: "#000" }}>This is user's likes.</Text>
        </View> 
    );
}

const styles = StyleSheet.create({
	container: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    }
});