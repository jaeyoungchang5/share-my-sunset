import { CURRENT_SERVER } from './server.util';

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