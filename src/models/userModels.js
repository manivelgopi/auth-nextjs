import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a User Name"],
        trim: true,
        minlength: [3, "Username must be at least 3 characters"],
        maxlength: [20, "Username must be less than 20 characters"],
},
    email: {
        type: String,
        required: [true, "Please provide a Email Id"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid Email Id"],
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password must be at least 6 characters"],

    },
    isVerfied:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
})


const User = mongoose.model.users || mongoose.model ("users", userSchema);

export default User;