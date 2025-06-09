import mongoose from "mongoose";
 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false // do not return password in queries by default
    },
    cartItems: {
        type: Object,
        default:{}
    },
},{minimize:false});

const User =mongoose.models.user|| mongoose.model("user", userSchema);
export default User;
