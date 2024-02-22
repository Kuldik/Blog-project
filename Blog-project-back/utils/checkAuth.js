import jwt from "jsonwebtoken";

export default async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, ''); // убирает слово Bearer из токена

    if(token) { // расшифровка токена и получение из него данных
        try {
            const decoded = jwt.verify(token, 'secret123'); // расшифровка пароля

            req.userId = decoded._id; // получение расшифрованного пароля
            next();
        } catch (e) {
            return res.status(403).json({
                message: 'Нет доступа'
            })
        }
    } else {
        return res.status(403).json({
            message: 'Нет доступа'
        })
    }
}