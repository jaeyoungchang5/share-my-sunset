// internal imports
import { CURRENT_SERVER } from './server.middleware';
import { createToken } from '../utils';
import { ISignupCredentials, ILoginCredentials, IUserGeneralInfo } from '../interfaces';


export function login(loginCredentials: ILoginCredentials){
    return fetch(CURRENT_SERVER + '/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(loginCredentials)
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Bad credentials!');
    })
    .then(({token}) => {
        createToken(token);
    });
}

export function signup(signupCredentials: ISignupCredentials) {
    return fetch(CURRENT_SERVER + '/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(signupCredentials)
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Username has already been taken');
    })
    .then(({token}) => {
        createToken(token);
    })
}

export function getUserInfo(userId: string) {
    return fetch(CURRENT_SERVER + '/user/getInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId: userId})
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Getting user info by id failed');
    })
}

export function updateUserInfo(userId: string, userInfo: IUserGeneralInfo) {
    return fetch(CURRENT_SERVER + '/user/updateInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId, ...userInfo})
    })
    .then(res => {
        if (res.status == 201) {
            return res.json();
        }
        throw new Error('Updating user info by id failed');
    })
}

export function getUserUsername(userId: string) {
    return fetch(CURRENT_SERVER + '/user/getUserUsername', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId: userId})
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Getting username by id failed');
    })
}