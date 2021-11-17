/**
 * @fileoverview sunset.model.ts
 * This file is the model (schema) file for the sunset collection.
 */

/* import dependencies */
import { Document, Schema, Model, model } from 'mongoose';

interface ISunset {
    createdAt: Date,
    username: string,
    type: string,
    content: {
        data: Buffer
    },
}

interface ISunsetModel extends ISunset, Document { }

const SunsetSchema: Schema = new Schema({
    username: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    content: {
        description: String
    }
}, {timestamps: true});

export const Sunset: Model<ISunsetModel> = model<ISunsetModel>("Sunset", SunsetSchema);