/**
 * @fileoverview sunset.controller.ts
 * This file contains all the controller functions for the sunset collection.
 */

/* import dependencies */
import { debuglog } from '../helpers';
import { Sunset } from '../models';
import { Request, Response } from 'express';
import mongoose, { ObjectId } from 'mongoose';

/**
 * @description Post a new sunset
 * @param {string} req.body.username User's username
 * @param {string} req.body.type Type of post (written, image, video)
 * @param {Object} req.body.content Content of post
 */
export function shareSunset(req: Request, res: Response): void {
    if (!req.body.username || !req.body.type|| !req.body.content) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }

    if (req.body.type == 'text') {
        const body = {
            createdAt: new Date(),
            username: req.body.username.toLowerCase(),
            type: req.body.type,
            content: {
                description: req.body.content.description
            }
        };

        const sunset = new Sunset(body);
        sunset.save()
        .then(newSunset => {
            debuglog('LOG', 'sunset controller - share', 'posted new sunset');
            res.status(201).json({result: 'success', message: 'New sunset shared successfully.'});
        }).catch(err => { // catch errors
            debuglog('ERROR', 'sunset controller - share', err);
            res.status(400).json(err);
        });
    }
}

/**
 * @description Get a sunset by it's ID
 * @param {ObjectId} req.body._id The _id of post
 */
export function getSunsetById(req: Request, res: Response) {
    if (!req.body._id) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }
    const body = {
        _id: new mongoose.Types.ObjectId(req.body._id)
    };

    Sunset.findById(body._id)
    .then(sunset => {
        if (!sunset) {
            debuglog('ERROR', 'sunset controller - get sunset', 'could not find post');
            res.status(404).json({result: 'error', message: 'Could not find sunset post.'});
            return;
        }
        debuglog('LOG', 'sunset controller - get sunset', 'found sunset post');
        res.status(200).json({result: 'success', data: sunset});
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - getUserInfo', err);
        res.status(400).json(err);
        return;
    })
}