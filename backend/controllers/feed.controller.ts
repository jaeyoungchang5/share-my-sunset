/**
 * @fileoverview feed.controller.ts
 * This file contains all the controller functions for the feed.
 * Functions: 
    ** getFeed
 */

/* import dependencies */
import { debuglog } from '../helpers';
import { User, Sunset } from '../models';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

/**
 * @description Get sunset feed
 * @param {ObjectId} req.body.userId The _id of the user
 */
export function getFeed(req: Request, res: Response) {
    if (!req.body.userId) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }

    const body = {
        userId: new mongoose.Types.ObjectId(req.body.userId)
    };

    User.findById(body.userId)
    .then(foundUser => {
        if (!foundUser){
            debuglog('ERROR', 'feed controller', 'username not found');
            res.status(404).json({result: 'error', message: 'Username not found.'});
            return;
        }
        Sunset.find({'userId': { $in: [...foundUser.friends, body.userId]}}).sort({createdAt: 'descending'})
        .then(sunsets => {
            debuglog('LOG', 'feed controller', 'got feed');
            res.status(200).json({result: 'success', message: 'Got feed', data: sunsets});
        }).catch(err => { // catch errors
            debuglog('ERROR', 'feed controller', err);
            res.status(400).json(err);
            return;
        });
    }).catch(err => { // catch errors
        debuglog('ERROR', 'feed controller', err);
        res.status(400).json(err);
        return;
    });
}