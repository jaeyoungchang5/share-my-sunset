/**
 * @fileoverview FriendRequest.model.ts
 * This file is the model (schema) file for the FriendRequest collection.
 */

/* import dependencies */
import mongoose, { Document, Schema, Model, model, ObjectId } from 'mongoose';

interface IFriendRequest {
    requester: mongoose.Types.ObjectId,
    recipient: mongoose.Types.ObjectId,
    status: Number
}

interface IFriendRequestModel extends IFriendRequest, Document { }

const FriendRequestSchema: Schema = new Schema({
    requester: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    recipient: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: Number,
        enums: [
            1,  // pending
            2,  // accepted
        ]
    }
}, {timestamps: true});

export const FriendRequest: Model<IFriendRequestModel> = model<IFriendRequestModel>("FriendRequest", FriendRequestSchema);