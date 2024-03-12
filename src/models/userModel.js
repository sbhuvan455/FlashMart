import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;