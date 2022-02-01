/**
 * @fileoverview friend.controller.ts
 * This file contains all the controller functions for the friend collection.
 * Functions: 
    ** checkFriendStatus
    ** getUsersFriends
    ** getUsersFriendRequests
    ** sendFriendRequest
    ** acceptFriendRequest
    ** rejectFriendRequest
    ** removeFriend
 */

/* import dependencies */
import { debuglog } from '../helpers';
import { User, IUserModel, FriendRequest } from '../models';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

/**
 * @description Check status of 2 users
 * @param {ObjectId} req.body.userIdA User A Id
 * @param {ObjectId} req.body.userIdB User B Id
 */
export function checkFriendStatus(req: Request, res: Response): void {
    if (!req.body.userIdA || !req.body.userIdB) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }

    const body = {
        userIdA: new mongoose.Types.ObjectId(req.body.userIdA),
        userIdB: new mongoose.Types.ObjectId(req.body.userIdB)
    }

    User.findOne({
        $or: [
            { _id: body.userIdA, friends: body.userIdB },
            { _id: body.userIdB, friends: body.userIdA }
        ]
    }).then(response => {
        if (response != null) {
            res.status(200).json({result: 'success', status: 'Friends', message: 'Users are friends.'});
            return;
        }
        FriendRequest.find({$or: [
            { requester: body.userIdA, recipient: body.userIdB },
            { recipient: body.userIdA, requester: body.userIdB }
        ]}).then(response => {
            if (response.length != 0) {
                res.status(200).json({result: 'success', status: 'Pending', message: 'Users are pending friends.', data: response});
                return;
            } 

            res.status(200).json({result: 'success', status: 'None', message: 'Users have no relationship.'});
        })
    })

}

/**
 * @description Gets user's friends by userId
 * @param {ObjectId} req.body.userId Requester
 */
export function getUsersFriends(req: Request, res: Response): void {
    if (!req.body.userId) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }

    const body = {
        userId: new mongoose.Types.ObjectId(req.body.userId)
    }

    User.findOne({_id: body.userId, isDeleted: false}).select('friends')
    .then(userData => {
        if (userData){
            User.find({'_id': { $in: userData.friends}}).select('firstName lastName username')
            .then(users => {
                debuglog('LOG', 'friend controller - getUsersFriends', 'got user friends');
                res.status(200).json({result: 'success', data: users});
                return;
            })
        } else {
            debuglog('ERROR', 'friend controller - getUsersFriends', 'user not found');
            res.status(404).json({result: 'error', message: 'User not found.'});
        }
    }).catch(err => { // catch errors
        debuglog('ERROR', 'friend controller - getUsersFriends', err);
        res.status(400).json(err);
        return;
    })
}

/**
 * @description Gets user's friends by userId
 * @param {ObjectId} req.body.userId Requester
 */
export function getUsersFriendRequests(req: Request, res: Response): void {
    if (!req.body.userId) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }

    const body = {
        userId: new mongoose.Types.ObjectId(req.body.userId)
    }

    FriendRequest.find({recipient: body.userId}).sort({createdAt: 'descending'}).select('requester')
    .then(existingRequests => {
        if (existingRequests.length == 0) {
            debuglog('LOG', 'friend controller - getUsersFriendRequests', 'no friend requests');
            res.status(200).json({result: 'success', message: 'No friend requests.'});
            return;
        }
        
        let friendRequesterIds = [];
        for (let i=0; i<existingRequests.length; i++) {
            friendRequesterIds.push(existingRequests[i].requester.toString())
        }

        User.find({'_id': { $in: friendRequesterIds}}).select('firstName lastName username')
        .then(users => {
            debuglog('LOG', 'friend controller - getUsersFriendRequests', 'got all friend requests');
            res.status(200).json({result: 'success', message: 'Got all friend requests.', data: users});
            return;
        })       

    }).catch(err => { // catch errors
        debuglog('ERROR', 'friend controller - getUsersFriendRequests', err);
        res.status(400).json(err);
        return;
    })
}

/**
 * @description Requester sends friend request to Recipient
 * @param {ObjectId} req.body.requester Requester
 * @param {ObjectId} req.body.recipient Recipient
 */
export function sendFriendRequest(req: Request, res: Response): void {
    if (!req.body.requester || !req.body.recipient) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }

    const body = {
        requester: new mongoose.Types.ObjectId(req.body.requester),
        recipient: new mongoose.Types.ObjectId(req.body.recipient)
    };

    User.find({'_id': { $in: [body.requester, body.recipient]}})
    .then(doc => {
        if (doc.length != 2) {
            debuglog('ERROR', 'friend controller - sendFriendRequest', 'user(s) do not exist');
            res.status(404).json({result: 'error', message: 'User(s) do not exist.'});
            return;
        }
        let requester: IUserModel, recipient: IUserModel;
        if (doc[0]._id == body.requester) {
            requester = doc[0];
            recipient = doc[1];
        } else {
            requester = doc[1];
            recipient = doc[0];
        }

        if (requester.friends.includes(recipient._id) || recipient.friends.includes(requester._id)) {
            debuglog('ERROR', 'friend controller - sendFriendRequest', 'users are already friends');
            res.status(400).json({result: 'error', message: 'Users are already friends.'});
            return;
        }

        const friendRequestBody = {
            requester: body.requester,
            recipient: body.recipient,
            status: 1
        };

        FriendRequest.find({$or: [
            { requester: body.requester, recipient: body.recipient },
            { recipient: body.requester, requester: body.recipient }
        ]})
        .then(existingRequests => {
            if (existingRequests.length > 0) {
                debuglog('ERROR', 'friend controller - sendFriendRequest', 'friend request already sent');
                res.status(400).json({result: 'error', message: 'Friend request already sent.'});
                return;
            }

            const newFriendRequest = new FriendRequest(friendRequestBody);
            newFriendRequest.save()
            requester.friendRequests.push(newFriendRequest._id);
            recipient.friendRequests.push(newFriendRequest._id);
            requester.save();
            recipient.save();
            debuglog('LOG', 'friend controller - sendFriendRequest', 'friend request sent');
            res.status(200).json({result: 'success', message: 'Friend request sent.'});

        })
    })
}

/**
 * @description Recipient accepts friend request
 * @param {ObjectId} req.body.requester Requester
 * @param {ObjectId} req.body.recipient Recipient
 */
export function acceptFriendRequest(req: Request, res: Response): void {
    if (!req.body.requester || !req.body.recipient) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }

    const body = {
        requester: new mongoose.Types.ObjectId(req.body.requester),
        recipient: new mongoose.Types.ObjectId(req.body.recipient)
    };

    FriendRequest.findOneAndRemove({ requester: body.requester, recipient: body.recipient, status: 1 })
    .then(friendObject => {
        if (!friendObject) {
            debuglog('ERROR', 'friend controller - acceptFriendRequest', 'Friend request does not exists');
            res.status(400).json({result: 'error', message: 'Friend request does not exists.'});
            return;
        }

        User.find({'_id': { $in: [body.requester, body.recipient]}})
        .then(doc => {
            if (doc.length != 2) {
                debuglog('ERROR', 'friend controller - acceptFriendRequest', 'user(s) do not exist');
                res.status(404).json({result: 'error', message: 'User(s) do not exist.'});
                return;
            }

            doc[0].friends.push(doc[1]._id);
            doc[1].friends.push(doc[0]._id);

            let index: number;
            index = doc[0].friendRequests.indexOf(friendObject._id, 0);
            if (index > -1) {
                doc[0].friendRequests.splice(index, 1);
            }
            index = doc[1].friendRequests.indexOf(friendObject._id, 0);
            if (index > -1) {
                doc[1].friendRequests.splice(index, 1);
            }

            doc[0].save();
            doc[1].save();

            debuglog('LOG', 'friend controller - acceptFriendRequest', 'friend request successfully accepted');
            res.status(200).json({result: 'success', message: 'Friend request successfully accepted.'});
        })
    }).catch(err => { // catch errors
        debuglog('ERROR', 'friend controller - acceptFriendRequest', err);
        res.status(400).json(err);
        return;
    });
}

/**
 * @description Recipient rejects friend request
 * @param {ObjectId} req.body.requester Requester
 * @param {ObjectId} req.body.recipient Recipient
 */
export function rejectFriendRequest(req: Request, res: Response): void {
    if (!req.body.requester || !req.body.recipient) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }

    const body = {
        requester: new mongoose.Types.ObjectId(req.body.requester),
        recipient: new mongoose.Types.ObjectId(req.body.recipient)
    };

    FriendRequest.findOneAndRemove({ requester: body.requester, recipient: body.recipient, status: 1 })
    .then(friendObject => {
        if (!friendObject) {
            debuglog('ERROR', 'friend controller - rejectFriendRequest', 'Friend request does not exists');
            res.status(400).json({result: 'error', message: 'Friend request does not exists.'});
            return;
        }

        User.find({'_id': { $in: [body.requester, body.recipient]}})
        .then(doc => {
            if (doc.length != 2) {
                debuglog('ERROR', 'friend controller - rejectFriendRequest', 'user(s) do not exist');
                res.status(404).json({result: 'error', message: 'User(s) do not exist.'});
                return;
            }

            let index: number;
            index = doc[0].friendRequests.indexOf(friendObject._id, 0);
            if (index > -1) {
                doc[0].friendRequests.splice(index, 1);
            }
            index = doc[1].friendRequests.indexOf(friendObject._id, 0);
            if (index > -1) {
                doc[1].friendRequests.splice(index, 1);
            }

            doc[0].save();
            doc[1].save();

            debuglog('LOG', 'friend controller - rejectFriendRequest', 'friend request successfully rejected');
            res.status(200).json({result: 'success', message: 'Friend request successfully rejected.'});
        })
    }).catch(err => { // catch errors
        debuglog('ERROR', 'friend controller - rejectFriendRequest', err);
        res.status(400).json(err);
        return;
    });
}

/**
 * @description Recipient removes requester as a friend
 * @param {ObjectId} req.body.requester Requester
 * @param {ObjectId} req.body.recipient Recipient
 */
export function removeFriend(req: Request, res: Response): void {
    if (!req.body.requester || !req.body.recipient) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }

    const body = {
        requester: new mongoose.Types.ObjectId(req.body.requester),
        recipient: new mongoose.Types.ObjectId(req.body.recipient)
    };

    User.find({'_id': { $in: [body.requester, body.recipient]}})
    .then(doc => {
        if (doc.length != 2) {
            debuglog('ERROR', 'friend controller - remove', 'user(s) do not exist');
            res.status(404).json({result: 'error', message: 'User(s) do not exist.'});
            return;
        }

        let index: number;
        index = doc[0].friends.indexOf(doc[1]._id, 0);
        if (index > -1) {
            doc[0].friends.splice(index, 1);
        }
        index = doc[1].friends.indexOf(doc[0]._id, 0);
        if (index > -1) {
            doc[1].friends.splice(index, 1);
        }

        doc[0].save();
        doc[1].save();

        debuglog('LOG', 'friend controller - remove', 'friend successfully removed');
        res.status(200).json({result: 'success', message: 'Friend successfully removed.'});
    })
}