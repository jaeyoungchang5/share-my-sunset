import { IShareSunsetInfo } from '../interfaces';
import { CURRENT_SERVER } from './server.middleware';

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

export function shareSunset(sunsetInfo: IShareSunsetInfo) {
    let formData = new FormData();
    formData.append('userId', sunsetInfo.userId);
    formData.append('description', sunsetInfo.description);
    formData.append('file', sunsetInfo.sunsetImage);
    // formData.append('file[sunsetImage]', sunsetInfo.sunsetImage);
    console.log(formData);
    return fetch(CURRENT_SERVER + '/sunset', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data; ', 'Accept': 'application/json' },
        body: formData
    })
    .then(res => {
        if (res.ok) return res.json();
    }).catch(err => {
        console.log('error');
        console.log(err);
        throw new Error('Sharing sunset failed');
    }).then(resData => {
        console.log('res data');
        console.log(resData);
    })
}