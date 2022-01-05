import { CURRENT_SERVER } from './server.middleware';

export function searchUsers(searchString: string) {
    return fetch(CURRENT_SERVER + '/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            searchString: searchString
        })
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Searching users failed');
    })
}