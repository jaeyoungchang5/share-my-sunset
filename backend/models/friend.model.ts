/**
 * @fileoverview friend.model.ts
 * This file is the model (schema) file for the friend collection.
 */

/* import dependencies */
import mongoose, { Document, Schema, Model, model, ObjectId } from 'mongoose';

interface IFriend {
    requester: mongoose.Types.ObjectId,
    recipient: mongoose.Types.ObjectId,
    status: Number
}

interface IFriendModel extends IFriend, Document { }

const FriendSchema: Schema = new Schema({
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

export const Friend: Model<IFriendModel> = model<IFriendModel>("Friend", FriendSchema);