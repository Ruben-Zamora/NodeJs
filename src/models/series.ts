import mongoose, { Schema } from "mongoose";
import ISeries from "./interfaces/series";

const UserSchema: Schema = new Schema({
    name: { type: String, required: true},
    director: { type: String, required: true},
    language: { type: String, required: true},
    year: { type: Number, required: false},
    seasons: { type: Number, required: true},
}, {
    timestamps: true,
}
);

export default mongoose.model<ISeries>('Series',UserSchema)