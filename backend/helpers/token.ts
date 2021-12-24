/**
 * @fileoverview token.ts
 * This file contains a function to help with token creation.
 */

import * as jwt from 'jsonwebtoken';

/**
 * @function createToken : creates a jwt token for user
 * @param {Object} user 
 * @returns String : jwt token
 */
export function createToken(user: any) {
    const body = {
        userId: user._id
    }

    return jwt.sign({ user: { body } }, process.env.ACCESS_TOKEN_SECRET);
}