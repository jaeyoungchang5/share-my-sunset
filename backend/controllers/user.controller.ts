/**
 * @fileoverview user.controller.ts
 * This file contains all the controller functions for the user collection.
 * Functions: 
    ** signup 
    ** login 
    ** getUserInfo 
    ** updateUserInfo 
    ** updateUserPassword 
    ** deleteUser
    ** adminUpdateUserPassword
 */

/* import dependencies */
import { debuglog, createToken } from '../helpers';
import { User } from '../models';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

/**
 * @description Signup a new user
 * @param {string} req.body.firstName   User's first name
 * @param {string} req.body.lastName    User's last name
 * @param {string} req.body.username    User's username
 * @param {string} req.body.password    User's password
 * @param {string} req.body.bio         User's bio
 * @param {string} req.body.privacyMode User's privacy mode
 */
export function signup(req: Request, res: Response): void{
    if (!req.body.firstName || !req.body.lastName|| !req.body.username || !req.body.password) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }

    const body = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username.toLowerCase(),
        password: req.body.password,
        bio: req.body.bio,
        privacyMode: req.body.privacyMode
    }

    const user = new User(body);
    user.save()
    .then(newUser => {
        debuglog('LOG', 'user controller - signup', 'signed up new user');
        const token = createToken(newUser);
        res.status(201).json({result: 'success', message: 'New user signup successful.', token: token});
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - signup', err);
        res.status(400).json(err);
    });
}

/**
 * @description Request login for an existing user
 * @param {string} req.body.username User's username
 * @param {string} req.body.password User's password
 */
export function login(req: Request, res: Response){
    if (!req.body.username || !req.body.password) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }

    const body = {
        username: req.body.username.toLowerCase(),
        password: req.body.password,
    }

    debuglog('LOG', 'user controller - login', 'attempting login');
    User.findOne({username: body.username, isDeleted: false})
    .then(foundUser => {
        if (!foundUser){
            debuglog('ERROR', 'user controller - login', 'user not found');
            res.status(404).json({result: 'error', message: 'User not found.'});
            return;
        }

        // check given password against password in db
        if (foundUser.checkPassword(body.password)){
            debuglog('LOG', 'user controller - login', 'found user, correct password');
            const token = createToken(foundUser);
            res.header('auth-token', token);
            res.status(201).json({result: 'success', message: 'Login successful.', token: token});
        } else {
            debuglog('LOG', 'user controller - login', 'found user, incorrect password');
            res.status(401).json({result: 'error', message: 'Incorrect password, login unauthorized.'});
        }
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - login', err);
        res.status(400).json(err);
        return;
    });
}

/**
 * @description Get info for a user, given user's id
 * @param {ObjectId} req.body.userId User's id
 */
export function getUserInfo(req: Request, res: Response){
    if (!req.body.userId) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }

    const body = {
        userId: new mongoose.Types.ObjectId(req.body.userId)
    }

    User.findOne({_id: body.userId, isDeleted: false}).select('username firstName lastName bio')
    .then(userData => {
        if (userData){
            debuglog('LOG', 'user controller - getUserInfo', 'got user info');
            res.status(200).json({result: 'success', data: userData});
        } else {
            debuglog('ERROR', 'user controller - getUserInfo', 'user not found');
            res.status(404).json({result: 'error', message: 'User not found.'});
        }
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - getUserInfo', err);
        res.status(400).json(err);
        return;
    })
}

/**
 * @description Update user info (excluding password)
 * @param {ObjectId} req.body.userId User's id
 * @param {Object} req.body Any fields that the user wants to update: {"key": "value", "key": "value", etc.}
 */
export function updateUserInfo(req: Request, res: Response){
    if (!req.body.userId) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }
    const userId = new mongoose.Types.ObjectId(req.body.userId);

    let body: {[key:string]: any} = {};
    let key: string
    for (key in req.body) {
        const dontTouch: string[] = ['password', '_id', 'friends', 'friendRequests', 'sunsets', 'isDeleted'];
        if (req.body[key] == undefined || dontTouch.includes(key)) {
            continue;
        }
        if (key == 'username') {
            body[key] = req.body[key].toLowerCase();
            continue;
        }
        body[key] = req.body[key];
    }

    if (Object.keys(body).length == 0) {
        debuglog('LOG', 'user controller - updateUserInfo', 'nothing to update');
        res.status(400).json({ result: 'error', message: 'Nothing to update.' });
        return;
    }

    User.updateOne({_id: userId, isDeleted: false}, {$set: body})
    .then(dbResponse => {
        if (dbResponse.modifiedCount == 1){
            debuglog('LOG', 'user controller - updateUserInfo', 'updated user info');
            res.status(201).json({result: 'success', message: 'User update successful.'});
        } else if (dbResponse.matchedCount == 0) {
            debuglog('LOG', 'user controller - updateUserInfo', 'user not found');
            res.status(404).json({ result: 'error', message: 'User not found.' });
        } else if (dbResponse.modifiedCount == 0) {
            debuglog('LOG', 'user controller - updateUserInfo', 'no info updated');
            res.status(400).json({ result: 'error', message: 'No info updated.' });
        }
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - updateUserInfo', err);
        res.status(400).json(err.message);
    });
}

/**
 * @description Update user password
 * @param {ObjectId} req.body.userId User's id
 * @param {string} req.body.oldPassword User's old password
 * @param {string} req.body.newPassword User's new password
 */
export function updateUserPassword(req: Request, res: Response) {
    if (!req.body.userId || !req.body.oldPassword || !req.body.newPassword) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }

    const body = {
        userId: new mongoose.Types.ObjectId(req.body.userId),
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword
    };

    User.findOne({_id: body.userId, isDeleted: false})
    .then(foundUser => {
        if (!foundUser){
            debuglog('ERROR', 'user controller - put user password', 'user not found');
            res.status(404).json({result: 'error', message: 'User not found.'});
            return;
        }

        debuglog('LOG', 'user controller - put user password', 'attempting to update password');
        if (foundUser.checkPassword(body.oldPassword)){
            foundUser.password = body.newPassword;
            foundUser.save()
            .then(newUser => {
                debuglog('LOG', 'user controller - put user password', 'updated password');
                const token = createToken(newUser);
                res.status(201).json({result: 'success', message: 'Update password successful.', token: token});
            })
        } else {
            debuglog('LOG', 'user controller - put user password', 'found user, incorrect password');
            res.status(401).json({result: 'error', message: 'Incorrect password, update password unauthorized.'});
        }

    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - put user password', err);
        res.status(400).json(err);
        return;
    });
}

/**
 * @description Delete user
 * @param {ObjectId} req.body.userId User's id
 */
export function deleteUser(req: Request, res: Response){
    if (!req.body.userId) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }
    const userId = new mongoose.Types.ObjectId(req.body.userId);

    User.updateOne({_id: userId, isDeleted: false}, {$set: {isDeleted: true}})
    .then(dbResponse => {
        if (dbResponse.modifiedCount == 1){
            debuglog('LOG', 'user controller - deleteUser', 'deleted user');
            res.status(201).json({result: 'success', message: 'Delete user successful.'});
        } else if (dbResponse.matchedCount == 0) {
            debuglog('LOG', 'user controller - deleteUser', 'user not found');
            res.status(404).json({ result: 'error', message: 'User not found.' });
        }
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - deleteUser', err);
        res.status(400).json(err.message);
    });
}

/**
 * @description Update user password - admin
 * @param {string} req.body.username User's username
 * @param {string} req.body.newPassword User's new password
 */
export function adminUpdateUserPassword(req: Request, res: Response) {
    if (!req.body.username || !req.body.newPassword) {
        res.status(400).json({result: 'error', message: 'Unsatisfied requirements.'});
        return;
    }

    const body = {
        username: req.body.username.toLowerCase(),
        newPassword: req.body.newPassword
    };

    User.findOne({username: body.username})
    .then(foundUser => {
        if (!foundUser){
            debuglog('ERROR', 'user controller - admin put user password', 'user username not found');
            res.status(404).json({result: 'error', message: 'Username not found.'});
            return;
        }

        foundUser.password = body.newPassword;
        foundUser.save()
        .then(newUser => {
            debuglog('LOG', 'user controller - admin put user password', 'updated password');
            const token = createToken(newUser);
            res.status(201).json({result: 'success', message: 'Admin update password successful.', token: token});
        })
    }).catch(err => { // catch errors
        debuglog('ERROR', 'user controller - admin put user password', err);
        res.status(400).json(err);
        return;
    });

}