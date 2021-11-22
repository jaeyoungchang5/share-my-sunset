/**
 * @fileoverview sunset.model.ts
 * This file is the model (schema) file for the sunset collection.
 */

/* import dependencies */
import mongoose, { Document, Schema, Model, model } from 'mongoose';

interface ISunset {
    userId: mongoose.Types.ObjectId,
    sunsetImage: string,
    description: string
}

interface ISunsetModel extends ISunset, Document { }

const SunsetSchema: Schema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sunsetImage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true});

export const Sunset: Model<ISunsetModel> = model<ISunsetModel>("Sunset", SunsetSchema);