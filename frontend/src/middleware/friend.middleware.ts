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

export function getUsersFriendRequests(userId: string) {
    return fetch(CURRENT_SERVER + '/friend/getUsersFriendRequests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId: userId})
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Getting users friend requests info by id failed');
    })
}

export function sendFriendRequest(requester: string, recipient: string) {
    return fetch(CURRENT_SERVER + '/friend/sendFriendRequest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({requester: requester, recipient: recipient})
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Sending friend request failed');
    })
}

export function acceptFriendRequest(requester: string, recipient: string) {
    return fetch(CURRENT_SERVER + '/friend/acceptFriendRequest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({requester: requester, recipient: recipient})
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Accepting friend request failed');
    })
}

export function rejectFriendRequest(requester: string, recipient: string) {
    return fetch(CURRENT_SERVER + '/friend/rejectFriendRequest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({requester: requester, recipient: recipient})
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Rejecting friend request failed');
    })
}

export function removeFriend(requester: string, recipient: string) {
    return fetch(CURRENT_SERVER + '/friend/removeFriend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({requester: requester, recipient: recipient})
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Removing friend failed');
    })
}