import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "User Name is required"],
        unique: [true, "User Name not avaiable"],
        trim: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: [true, "Email is required field"],
        unique: [true, "Email is already used"],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required field"]
    },
    fullName: {
        type: String,
        required: [true, "Full Name is required field"]
    },
    profilePicUrl: {
        type: String,
        required: [true, "Upload Profile Picture"]
    },
    coverPicUrl: {
        type: String,
        required: false
    },
    wachedHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true,
        default: []
    }],
    likedVideo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true,
        default: []
    }],
    bio: {
        type: String,
        required: false
    },
    refreashToken: {
        type: String,
    }
}, { timestamps: true });

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPassCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}

userSchema.methods.generateRefreashToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);