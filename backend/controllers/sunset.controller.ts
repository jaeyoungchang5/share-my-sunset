/**
 * @fileoverview sunset.controller.ts
 * This file contains all the controller functions for the sunset collection.
 * @todo Get sunsets by username
 */

/* import dependencies */
import { debuglog } from '../helpers';
import { db } from '../config';
import { Sunset } from '../models';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

/**
 * @description Post a new sunset
 * @param {ObjectId} req.body.userId User's Id
 * @param {string} req.body.description Description of post (a caption)
 * @param {Object} req.file Content of post
 */
export function shareSunset(req: Request, res: Response): void {
    if (!req.body.userId || !req.body.description || !req.file) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }

    const body = {
        userId: new mongoose.Types.ObjectId(req.body.userId),
        description: req.body.description,
        sunsetImage: req.file.filename
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

        const collectionFiles = db.collection('images00.files');
        const collectionChunks = db.collection('images00.chunks');

        collectionFiles.find({filename: sunset.sunsetImage}).toArray(function(err, docs) {
            if (err) {
                res.status(400).json({result: 'error', message: 'Failed to find sunset image in files.'});
                return;
            }

            if (!docs || docs.length == 0) {
                res.status(404).json({result: 'error', message: 'No file found.'});
                return;
            }

            collectionChunks.find({files_id: docs[0]._id})
            .sort({n: 1}).toArray(function(err, chunks) {
                if (err) {
                    res.status(400).json({result: 'error', message: 'Failed to find sunset image in chunks.'});
                    return;
                }

                if (!chunks || chunks.length == 0) {
                    res.status(404).json({result: 'error', message: 'No file found.'});
                    return;
                }

                let fileData = [];
                for (let i = 0; i < chunks.length; i++) {
                    fileData.push(chunks[i].data.toString('base64'));
                }
                const finalData = {
                    userId: sunset.userId,
                    description: sunset.description,
                    sunsetImage: `data:${docs[0].contentType};base64,${fileData.join('')}`
                }
                debuglog('LOG', 'sunset controller - get sunset', 'found sunset post');
                res.status(200).json({result: 'success', message: 'Found sunset post.', data: finalData})
            })
        })
    }).catch(err => { // catch errors
        debuglog('ERROR', 'sunset controller - get sunset', err);
        res.status(400).json(err);
        return;
    })
}