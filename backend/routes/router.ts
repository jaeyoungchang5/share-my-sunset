/**
 * @fileoverview router.ts
 * This file provides all the API endpoint routes for the server.
 */

/* import dependencies */
import express, { Response, Request, Router } from 'express';
const router: Router = express.Router(); // activate router
import { debuglog } from '../helpers';
import { upload } from '../config';

/* link controllers */
import * as userCtrl from '../controllers/user.controller';
import * as sunsetCtrl from '../controllers/sunset.controller';
import * as friendCtrl from '../controllers/friend.controller';
import * as feedCtrl from '../controllers/feed.controller';
import * as searchCtrl from '../controllers/search.controller';

/* ROUTE ENDPOINTS */

// test
router.get('/test', (req: Request, res: Response): void => {
    debuglog('LOG', 'router - test', 'Router Test Success');
    res.json({'result': 'router test success'});
});

// users
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/user/getInfo', userCtrl.getUserInfo);
router.post('/user/getUserUsername', userCtrl.getUserUsername);
router.post('/user/updateInfo', userCtrl.updateUserInfo);
router.post('/user/updatePassword', userCtrl.updateUserPassword);
router.post('/user/deleteUser', userCtrl.deleteUser);
router.post('/admin/updateUserPassword', userCtrl.adminUpdateUserPassword);

// sunsets
router.post('/sunset', upload.single('sunsetImage'), sunsetCtrl.shareSunset);
router.post('/sunset/getSunsetById', sunsetCtrl.getSunsetById);
router.post('/sunset/getSunsetIdsByUserId', sunsetCtrl.getSunsetIdsByUserId);
router.post('/sunset/deleteSunset', sunsetCtrl.deleteSunset);
router.post('/sunset/updateSunsetCaption', sunsetCtrl.updateSunsetCaption);

// friends
router.post('/friend/checkFriendStatus', friendCtrl.checkFriendStatus);
router.post('/friend/getUsersFriends', friendCtrl.getUsersFriends);
router.post('/friend/getUsersFriendRequests', friendCtrl.getUsersFriendRequests);
router.post('/friend/sendFriendRequest', friendCtrl.sendFriendRequest);
router.post('/friend/acceptFriendRequest', friendCtrl.acceptFriendRequest);
router.post('/friend/rejectFriendRequest', friendCtrl.rejectFriendRequest);
router.post('/friend/removeFriend', friendCtrl.removeFriend);

// feed
router.post('/getFeed', feedCtrl.getFeed);

// search
router.post('/search', searchCtrl.searchUsers);

export {
    router
};