/**
 * @fileoverview search.controller.ts
 * This file contains all the controller functions for searching.
 * Functions: 
    ** searchUsers
 */

/* import dependencies */
import { debuglog } from '../helpers';
import { User, IUserModel } from '../models';
import { Request, Response } from 'express';

/**
 * @description Searches given a searchString
 * @param {string} req.body.searchString Given search string
 */
export function searchUsers(req: Request, res: Response): void {
    if (!req.body.searchString) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }

    User.find({ $text: { $search: req.body.searchString } } )
    .select('_id username firstName lastName')
    .then(searchResults => {
        debuglog('LOG', 'search controller - search users', 'completed search');
        res.status(200).json({result: 'success', data: searchResults});
    }).catch(err => { // catch errors
        debuglog('ERROR', 'search controller - search users', err);
        res.status(400).json(err);
        return;
    })
}