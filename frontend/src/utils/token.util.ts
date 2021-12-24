import AsyncStorage from '@react-native-async-storage/async-storage';
import { Base64 } from 'js-base64';

export function getUser(){
    return getToken()
    .then(token => {
        console.log('userutil :: getUser :: got raw token :: ' + token)
        try {
            if (token) {
                const user = JSON.parse(Base64.atob(token.split('.')[1]))['user'];
                console.log(`userutil :: getUser :: got token for ${user['netID']}`);
                return user;
            }
        } catch (e) {
            return null;
        }
    })
    .then(res => {
        return res;
    })
}

export function createToken(token: any){
    console.log('userutil :: createToken :: creating token ' + token);
    if (token) {
        console.log('userutil :: createToken :: attempting');
        AsyncStorage.setItem('token', token)
        .then(() => {
            AsyncStorage.getItem('token')
            .then((result) => {
                console.log('userutil :: createToken :: successfully created token ' + result);
            })
        })
    } else {
        console.log('userutil :: createToken :: no token passed');
        AsyncStorage.removeItem('token');
    }
}

async function getToken(){
    console.log('userutil :: getToken :: start')
    try {
        const tok = await AsyncStorage.getItem('token');
        console.log('userutil :: getToken :: got following token - ' + tok);
        return tok;
    } catch(e) {
        // error reading value
    }   
}

export function removeToken(){
    AsyncStorage.removeItem('token');
    console.log('removed token');
}