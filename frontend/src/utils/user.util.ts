import { CURRENT_SERVER } from './server.util';

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