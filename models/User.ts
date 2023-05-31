import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    name: String,
    age: Number,
});

export const UserModel =  mongoose.model('User', userSchema);