import { SERVER } from '@env';

export function getSunsetById(sunsetId: string) {
    return fetch(SERVER + '/getFeed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sunsetId)
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Getting sunset by id failed');
    })
}