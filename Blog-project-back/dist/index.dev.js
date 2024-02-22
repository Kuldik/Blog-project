"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validations = require("./validations.js");

var _checkAuth = _interopRequireDefault(require("./utils/checkAuth.js"));

var UserController = _interopRequireWildcard(require("./controllers/UserController.js"));

var PostController = _interopRequireWildcard(require("./controllers/PostController.js"));

var _multer = _interopRequireDefault(require("multer"));

var _handleValidationErrors = _interopRequireDefault(require("./utils/handleValidationErrors.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].connect( // подключение к базе данных MongoDB с конструкцией указанием работоспособности сервера
'mongodb+srv://timklimenkoo:wwwwww@cluster0.pxrgfjq.mongodb.net/blog?retryWrites=true&w=majority').then(function (result) {
  console.log('DB OK');
})["catch"](function (err) {
  console.log('DB ERROR', err);
});

var app = (0, _express["default"])(); // Создаем хранилище для загружаемых изображений

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads');
  },
  // функция возращает путь файла
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  } // функция возращает оригинальное имя файла

});

var upload = (0, _multer["default"])({
  storage: storage
});
app.use(_express["default"].json()); // необходимм для работы с json
// Проверка, необходимая для того чтобы указать маршрут на папку в которой хранятся статичные файлы

app.use('/uploads', _express["default"]["static"]('uploads')); //NOTE - Авторизация   Делаем валидацию  Ищем ошибки и парсим    Если нет ошибок, то передаем следующее действие

app.post('/auth/login', _validations.loginValidation, _handleValidationErrors["default"], UserController.login); //NOTE - Регистрация

app.post('/auth/register', _validations.registerValidation, _handleValidationErrors["default"], UserController.register); //NOTE - Получение информации о пользователе

app.get('/auth/me', _checkAuth["default"], UserController.getMe); // NOTE - Создание поста

app.post('/posts', _checkAuth["default"], _validations.postCreateValidation, _handleValidationErrors["default"], PostController.create); // NOTE - Получение всех постов

app.get('/posts', PostController.getAll); // NOTE - Получение одного поста

app.get('/posts/:id', PostController.getOne); // NOTE - Удаление поста

app["delete"]('/posts/:id', _checkAuth["default"], PostController.remove); // NOTE - Обновление поста

app.patch('/posts/:id', _checkAuth["default"], _validations.postCreateValidation, _handleValidationErrors["default"], PostController.update); // NOTE - Загрузка изображений

app.post('/upload', _checkAuth["default"], upload.single('image'), function (req, res) {
  res.json({
    url: "/uploads/".concat(req.file.originalname)
  }); // Если загрузка прошла успешно, то клиенту бедет передана ссылка на изображение 
});
app.listen(3004, function (err) {
  // создаем сервер, 3004 - порт. Создаем функцию, в которой в случае ошибки будет выведено сообщение об ошибке
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log('Server is OK');
});