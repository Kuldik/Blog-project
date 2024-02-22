import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate({ path: "user", select: ["name", "avatar"] }).exec()

        res.json(posts);
    } catch (error) {
        res.status(500).json({
            message :'Не удалось получиь статью'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id; // получаем идентификатор поста из параметров запроса
        
        const finededAndUpdatedDocument = await PostModel.findOneAndUpdate(
            { 
                _id: postId,
            }, 
            {
                $inc: {viewsCount: 1} // в MongoDB $inc - увеличивает значение, в нашем случае, в поле viewsCount на 1
            },
            {
                returnDocument: 'after' // третьим параметром возвращает документ после обновления
            }
        );
    
        if (!finededAndUpdatedDocument) {
            return res.status(404).json({
                message :'Статья не найдена'
            });
        }
    
        res.json(finededAndUpdatedDocument);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message :'Не удалось получить статью'
        });
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id; // получаем идентификатор поста из параметров запроса
    
        const deletedDocument = await PostModel.findOneAndDelete({ _id: postId });
    
        if (!deletedDocument) {
            return res.status(404).json({
                message :'Статья не найдена'
            });
        }
        
        res.json({
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message :'Не удалось удалить статью'
        });
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
        });

        const post = await doc.save();

        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message :'Не удалось создать статью'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id

        await PostModel.updateOne(// Находим одну статью и обновляем ее
            { 
                _id: postId,
            }, 
            { // указываем что конкретно будем обновлять 
                title: req.body.title, 
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags,
            },
        );

        res.json({
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message :'Не удалось обновить статью'
        })
    }
}