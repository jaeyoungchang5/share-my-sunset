import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';

export function UserPosts() {
    console.log('User Posts');
    return (
        <View style={styles.container}>
            <Text style={{ color: "#000", fontSize: 40 }}>This is user's posts.</Text>
        </View> 
    );
}

const styles = StyleSheet.create({
	container: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#03cafc'
    }
});