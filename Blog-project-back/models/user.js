import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    avatarUrl: String // так стоит указывать в случаях когда пользователю не обязателньо это указывать/заполнять/загружать
}, 
    {
        timestamps: true // дата создания и обновления
    },
);

export default mongoose.model('User', userSchema)