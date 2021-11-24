/**
 * @fileoverview sunset.controller.ts
 * This file contains all the controller functions for the sunset collection.
 * Functions: 
    ** shareSunset 
    ** getSunsetById 
    ** getSunsetIdsByUserId 
    ** deleteSunset
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
    console.log(req.body);
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
            debuglog('ERROR', 'sunset controller - get sunset by id', 'could not find post');
            res.status(404).json({result: 'error', message: 'Could not find sunset post.'});
            return;
        }

        const collectionFiles = db.collection('images00.files');
        const collectionChunks = db.collection('images00.chunks');

        collectionFiles.findOne({filename: sunset.sunsetImage})
        .then(doc => {

            if (!doc) {
                res.status(404).json({result: 'error', message: 'No file found.'});
                return;
            }

            collectionChunks.find({files_id: doc._id})
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
                    sunsetImage: `data:${doc.contentType};base64,${fileData.join('')}`
                }
                debuglog('LOG', 'sunset controller - get sunset by id', 'found sunset post');
                res.status(200).json({result: 'success', message: 'Found sunset post.', data: finalData})
            })
        })
    }).catch(err => { // catch errors
        debuglog('ERROR', 'sunset controller - get sunset by id', err);
        res.status(400).json(err);
        return;
    })
}

/**
 * @description Get sunset Ids by it's User ID
 * @param {ObjectId} req.body.userId The _id of the user
 */
export function getSunsetIdsByUserId(req: Request, res: Response) {
    if (!req.body.userId) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }
    const body = {
        userId: new mongoose.Types.ObjectId(req.body.userId)
    };

    Sunset.find({userId: body.userId}).select('_id')
    .then(sunsetIds => {
        if (!sunsetIds) {
            debuglog('LOG', 'sunset controller - get sunset by user id', 'User has no posts');
            res.status(200).json({result: 'success', message: 'User has no posts.', data: sunsetIds});
            return;
        }

        debuglog('LOG', 'sunset controller - get sunset by user id', 'found sunset posts');
        res.status(200).json({result: 'success', message: 'Found sunset posts.', data: sunsetIds})
    }).catch(err => { // catch errors
        debuglog('ERROR', 'sunset controller - get sunset by user id', err);
        res.status(400).json(err);
        return;
    })
}

/**
 * @description Delete sunset by its id
 * @param {ObjectId} req.body.sunsetId The _id of the sunset
 */
export function deleteSunset(req: Request, res: Response) {
    if (!req.body.sunsetId) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }

    const body = {
        sunsetId: new mongoose.Types.ObjectId(req.body.sunsetId)
    };

    Sunset.findOneAndDelete({_id: body.sunsetId})
    .then(sunset => {
        if (!sunset) {
            debuglog('ERROR', 'sunset controller - delete sunset', 'could not find post');
            res.status(404).json({result: 'error', message: 'Could not find sunset post.'});
            return;
        }
        console.log(sunset);

        const collectionFiles = db.collection('images00.files');
        const collectionChunks = db.collection('images00.chunks');

        collectionFiles.findOne({filename: sunset.sunsetImage})
        .then(doc => {
            if (!doc) {
                res.status(404).json({result: 'error', message: 'No file found.'});
                return;
            }


            collectionFiles.deleteOne({filename: sunset.sunsetImage});
            collectionChunks.deleteMany({files_id: doc._id});
            console.log('done');
        })
        debuglog('LOG', 'sunset controller - delete sunset', 'successfully deleted sunset post');
        res.status(200).json({result: 'success', message: 'Successfully deleted sunset post.'});
    }).catch(err => { // catch errors
        debuglog('ERROR', 'sunset controller - delete sunset', err);
        res.status(400).json(err);
        return;
    })
}