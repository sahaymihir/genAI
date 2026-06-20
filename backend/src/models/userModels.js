import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'Username already taken'],
        required: true,
    },

    email: {
        type: String,
        unique: [true, 'Account already exist with this email id'],
        required: true,
    },

    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const userModel = mongoose.model('users', userSchema);

export default userModel;