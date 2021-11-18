/**
 * @fileoverview friend.controller.ts
 * This file contains all the controller functions for the friend collection.
 * @todo removeFriend function
 * @todo sendFriendREquest -- only work if it doesn't already exist
 */

/* import dependencies */
import { debuglog } from '../helpers';
import { User, Friend } from '../models';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

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

    // Make sure both users exist

    Friend.findOneAndUpdate(
        { requester: body.requester, recipient: body.recipient },
        { $set: { status: 1 }}, // status: requested
        { upsert: true, new: true }
    ).then(friendObject => {
        if (!friendObject) {
            debuglog('ERROR', 'friend controller - sendFriendRequest', 'Request could not be processed');
            res.status(400).json({result: 'error', message: 'Request could not be processed.'});
            return;
        }

        User.findOneAndUpdate(
            { _id: body.requester },
            { $addToSet: {friends: friendObject._id} }
        ).then(user => {
            if (!user) {
                debuglog('ERROR', 'friend controller - sendFriendRequest', 'Requester User could not be updated');
                res.status(400).json({result: 'error', message: 'Requester User could not be updated.'});
                return;
            }
        }).catch(err => { // catch errors
            debuglog('ERROR', 'friend controller - sendFriendRequest', err);
            res.status(400).json(err);
            return;
        })

        User.findOneAndUpdate(
            { _id: body.recipient },
            { $addToSet: {friends: friendObject._id} }
        ).then(user => {
            if (!user) {
                debuglog('ERROR', 'friend controller - sendFriendRequest', 'Recipient User could not be updated');
                res.status(400).json({result: 'error', message: 'Recipient User could not be updated.'});
                return;
            }
        }).catch(err => { // catch errors
            debuglog('ERROR', 'friend controller - sendFriendRequest', err);
            res.status(400).json(err);
            return;
        })


        debuglog('LOG', 'friend controller - sendFriendRequest', 'friend request successfully processed');
        res.status(200).json({result: 'success', message: 'Friend request successfully processed.'});

    }).catch(err => { // catch errors
        debuglog('ERROR', 'friend controller - sendFriendRequest', err);
        res.status(400).json(err);
        return;
    });
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

    Friend.findOneAndUpdate(
        { requester: body.requester, recipient: body.recipient, status: 1 },
        { $set: { status: 2 }}
    ).then(friendObject => {
        if (!friendObject) {
            debuglog('ERROR', 'friend controller - acceptFriendRequest', 'Request could not be processed');
            res.status(400).json({result: 'error', message: 'Request could not be processed.'});
            return;
        }

        debuglog('LOG', 'friend controller - sendFriendRequest', 'friend request successfully accepted');
        res.status(200).json({result: 'success', message: 'Friend request successfully accepted.'});
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

    Friend.findOneAndDelete(
        { requester: body.requester, recipient: body.recipient, status: 1 }
    ).then(friendObject => {
        if (!friendObject) {
            debuglog('ERROR', 'friend controller - rejectFriendRequest', 'Request could not be processed');
            res.status(400).json({result: 'error', message: 'Request could not be processed.'});
            return;
        }

        User.findOneAndUpdate(
            { _id: body.requester },
            { $pull: {friends: friendObject._id} }
        ).then(user => {
            if (!user) {
                debuglog('ERROR', 'friend controller - rejectFriendRequest', 'Requester User could not be updated');
                res.status(400).json({result: 'error', message: 'Requester User could not be updated.'});
                return;
            }
        }).catch(err => { // catch errors
            debuglog('ERROR', 'friend controller - rejectFriendRequest', err);
            res.status(400).json(err);
            return;
        })

        User.findOneAndUpdate(
            { _id: body.recipient },
            { $pull: {friends: friendObject._id} }
        ).then(user => {
            if (!user) {
                debuglog('ERROR', 'friend controller - rejectFriendRequest', 'Recipient User could not be updated');
                res.status(400).json({result: 'error', message: 'Recipient User could not be updated.'});
                return;
            }
        }).catch(err => { // catch errors
            debuglog('ERROR', 'friend controller - rejectFriendRequest', err);
            res.status(400).json(err);
            return;
        })


        debuglog('LOG', 'friend controller - rejectFriendRequest', 'friend request successfully rejected');
        res.status(200).json({result: 'success', message: 'Friend request successfully rejected.'});
    }).catch(err => { // catch errors
        debuglog('ERROR', 'friend controller - rejectFriendRequest', err);
        res.status(400).json(err);
        return;
    });
}