import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        unique: true
    },
    tags: {
        type: Array,
        default: []
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // ID
        ref: 'User', // По ID будет ссылаться на юзера
        required: true
    },
    ImageUrl: String // так стоит указывать в случаях когда пользователю не обязателньо это указывать/заполнять/загружать
}, 
    {
        timestamps: true // дата создания и обновления
    },
);

export default mongoose.model('Post', PostSchema)