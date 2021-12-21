import { SERVER } from '@env';

export function getFeed(userId: string) {
    console.log(JSON.stringify({userId: userId}));
    return fetch(SERVER + '/getFeed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId: userId})
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Getting feed failed');
    })
}