import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/user.js'


export const register =  async (req, res) => {
    try {
     // алгоритм шифрования пароля.
     const password = req.body.password;  // создается переменная с паролем
     const salt = await bcrypt.genSalt(10); // создается и генерируется переменная с солью
     const hash = await bcrypt.hash(password, salt); // создается переменная с хэшем пароля
 
     const doc = new UserModel({
         email: req.body.email,
         fullName: req.body.fullName,
         avatarUrl: req.body.avatarUrl,
         passwordHash: hash,
     });
 
     const user = await doc.save(); // создаем и сохраняем пользователя в базе данных 
 
     const token = jwt.sign(
         {
             _id: user._id
         },
         'secret123',
         {
             expiresIn: '30d'
         }
     )
         
     const {passwordHash, ...userData} = user._doc // убираем таким образом пароль из вывода в базу данных
     
     res.json({
         ...userData,
         token,
     }) // возвращаем информацию о пользователе
    } catch (err) {
         console.log(err);
         res.status(500).json({
             message :'Не удалось зарегестрироваться'
         })
    }
}

export const login = async (req, res) => {
    try { // Проверка на наличие пользователя в базе данных
        const user = await UserModel.findOne({ email:req.body.email });

        if (!user) { 
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash); 
        // если пользователь есть в базе данных, схоиться ли с тем что писал пользователь

        if (!isValidPass) { // если не подходит 
            return res.status(400).json({
                message: 'Неверный логин или пароль'
            })
        }

        const token = jwt.sign(
            {
                _id: user._id
            },
            'secret123',
            {
                expiresIn: '30d'
            }
        )

        const {passwordHash, ...userData} = user._doc // убираем таким образом пароль из вывода в базу данных
    
        res.json({
            ...userData,
            token,
        })

    } catch (error) {
        console.log(err);
        res.status(500).json({
            message :'Не удалось авторизоваться',
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            });
        }
        const { passwordHash, ...userData } = user._doc; // убираем таким образом пароль из вывода в базу данных

        res.json({ userData });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа'
        });
    }
}
