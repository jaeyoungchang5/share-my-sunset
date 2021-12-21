import { AWS_SERVER } from '@env';

export function getSunsetById(sunsetId: string) {
    return fetch(AWS_SERVER + '/sunset/getSunsetById', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({_id: sunsetId})
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Getting sunset by id failed');
    })
}