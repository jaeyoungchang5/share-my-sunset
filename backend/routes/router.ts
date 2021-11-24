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
import * as usersCtrl from '../controllers/user.controller';
import * as sunsetsCtrl from '../controllers/sunset.controller';
import * as friendsCtrl from '../controllers/friend.controller';

/* ROUTE ENDPOINTS */

// test
router.get('/test', (req: Request, res: Response): void => {
    debuglog('LOG', 'router - test', 'Router Test Success');
    res.json({'result': 'router test success'});
});

// users
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.post('/user/getInfo', usersCtrl.getUserInfo);
router.post('/user/updateInfo', usersCtrl.updateUserInfo);
router.post('/user/updatePassword', usersCtrl.updateUserPassword);
router.post('/admin/updateUserPassword', usersCtrl.adminUpdateUserPassword);

// sunsets
router.post('/sunset', upload.single('sunsetImage'), sunsetsCtrl.shareSunset);
router.post('/sunset/getSunsetById', sunsetsCtrl.getSunsetById);
router.post('/sunset/getSunsetIdsByUserId', sunsetsCtrl.getSunsetIdsByUserId);

// friends
router.post('/friend/sendFriendRequest', friendsCtrl.sendFriendRequest);
router.post('/friend/acceptFriendRequest', friendsCtrl.acceptFriendRequest);
router.post('/friend/rejectFriendRequest', friendsCtrl.rejectFriendRequest);
router.post('/friend/removeFriend', friendsCtrl.removeFriend);

export {
    router
};