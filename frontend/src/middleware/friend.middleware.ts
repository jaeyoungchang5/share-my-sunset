import { CURRENT_SERVER } from './server.middleware';

export function checkFriendStatus(userIdA: string, userIdB: string) {
    return fetch(CURRENT_SERVER + '/friend/checkFriendStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userIdA: userIdA,
            userIdB: userIdB
        })
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Checking users friends status failed');
    })
}

export function getUsersFriends(userId: string) {
    return fetch(CURRENT_SERVER + '/friend/getUsersFriends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId: userId})
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Getting users friends info by id failed');
    })
}