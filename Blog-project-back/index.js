import express from 'express'
import mongoose from 'mongoose';
import {registerValidation, loginValidation, postCreateValidation} from './validations.js';
import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';
import multer from 'multer';
import handleValidationErrors from './utils/handleValidationErrors.js';

mongoose.connect( // подключение к базе данных MongoDB с конструкцией указанием работоспособности сервера
    'mongodb+srv://timklimenkoo:wwwwww@cluster0.pxrgfjq.mongodb.net/blog?retryWrites=true&w=majority'
    ).then((result) => {
        console.log('DB OK');
    }).catch((err) => {
        console.log('DB ERROR', err);
    });

const app = express();

// Создаем хранилище для загружаемых изображений
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    }, // функция возращает путь файла
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    } // функция возращает оригинальное имя файла
})

const upload = multer({storage});

app.use(express.json()); // необходимм для работы с json

// Проверка, необходимая для того чтобы указать маршрут на папку в которой хранятся статичные файлы
app.use('/uploads', express.static('uploads'));

//NOTE - Авторизация   Делаем валидацию  Ищем ошибки и парсим    Если нет ошибок, то передаем следующее действие
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
//NOTE - Регистрация
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
//NOTE - Получение информации о пользователе
app.get('/auth/me', checkAuth, UserController.getMe);
// NOTE - Создание поста
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
// NOTE - Получение всех постов
app.get('/posts', PostController.getAll);
// NOTE - Получение одного поста
app.get('/posts/:id', PostController.getOne);
// NOTE - Удаление поста
app.delete('/posts/:id', checkAuth, PostController.remove);
// NOTE - Обновление поста
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);
// NOTE - Загрузка изображений
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    }) // Если загрузка прошла успешно, то клиенту бедет передана ссылка на изображение 
})

app.listen(3004, (err) => { // создаем сервер, 3004 - порт. Создаем функцию, в которой в случае ошибки будет выведено сообщение об ошибке
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log('Server is OK');
});

