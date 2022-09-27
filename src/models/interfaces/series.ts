import { Document } from "mongoose";

export default interface ISerie extends Document{
    name: string,
    director: string,
    language: string,
    year: number,
    seasons: number,
}