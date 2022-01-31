// external imports
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useToast, Modal, VStack, HStack, Button } from 'native-base';

// internal imports
import { removeToken } from '../../utils';
import { deleteUser } from '../../middleware';

export function SettingsPage({route, navigation}: any) {
	const appUserId: string = route.params.appUserId;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    function handleUpdateProfileButton() {
        navigation.navigate('Update Profile Page', {appUserId: appUserId});
    }

    function handleUpdatePasswordButton() {
        navigation.navigate('Update Password Page', {appUserId: appUserId});
    }

    function handleDeleteProfileButton() {
        setShowDeleteModal(false);
        deleteUser(appUserId)
        .then(res => {
            handleLogoutButton();
        }).catch(err => {

        })
    }

    function handleLogoutButton() {
        removeToken();
        navigation.navigate('Auth');
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={handleUpdateProfileButton}>
                <Text style={styles.btnText}>Update your profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={handleUpdatePasswordButton}>
                <Text style={styles.btnText}>Update your password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => setShowLogoutModal(true)}>
                <Text style={styles.deleteBtnText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => setShowDeleteModal(true)}>
                <Text style={styles.deleteBtnText}>Delete account</Text>
            </TouchableOpacity>

            <Modal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} size="lg">
                <Modal.Content maxWidth="350">
                    <Modal.CloseButton />
                    <Modal.Header>Log out</Modal.Header>
                    <Modal.Body>
                        <VStack space={3}>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text>Are you sure you want to log out?</Text>
                            </HStack>
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={{backgroundColor: 'red'}} flex="1" onPress={handleLogoutButton}>
                            Log out
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} size="lg">
                <Modal.Content maxWidth="350">
                    <Modal.CloseButton />
                    <Modal.Header>Delete Account</Modal.Header>
                    <Modal.Body>
                        <VStack space={3}>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text>Are you sure you want to delete your account?</Text>
                            </HStack>
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={{backgroundColor: 'red'}} flex="1" onPress={handleDeleteProfileButton}>
                            Delete Account
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    btnText: {
        // fontWeight: 'bold'
    },
    btn: {
        width: "70%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        backgroundColor: "#FFC0CB",
    },
    deleteBtn: {
        width: "70%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        backgroundColor: "red"
    },
    deleteBtnText: {
        fontWeight: 'bold',
        color: 'white'
    }
});