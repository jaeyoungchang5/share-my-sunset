import { CURRENT_SERVER } from './server.util';

export function getSunsetById(sunsetId: string) {
    return fetch(CURRENT_SERVER + '/sunset/getSunsetById', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({_id: sunsetId})
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Getting sunset by id failed');
    })
}

export function getFeed(userId: string) {
    return fetch(CURRENT_SERVER + '/getFeed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId: userId})
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Getting feed failed');
    })
}

export function getSunsetIdsByUserId(userId: string) {
    return fetch(CURRENT_SERVER + '/sunset/getSunsetIdsByUserId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId: userId})
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Getting sunset ids by user id failed');
    })
}