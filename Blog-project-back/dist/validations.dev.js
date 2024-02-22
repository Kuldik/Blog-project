"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postCreateValidation = exports.registerValidation = exports.loginValidation = void 0;

var _expressValidator = require("express-validator");

var loginValidation = [// создаем массив с проверками вводимых данных
(0, _expressValidator.body)('email', 'Неверный формат почты').isEmail(), (0, _expressValidator.body)('password', 'Пароль должен быть минимум 5 символов').isLength({
  min: 5
})];
exports.loginValidation = loginValidation;
var registerValidation = [// создаем массив с проверками вводимых данных
(0, _expressValidator.body)('email', 'Неверный формат почты').isEmail(), (0, _expressValidator.body)('password', 'Пароль должен быть минимум 5 символов').isLength({
  min: 5
}), (0, _expressValidator.body)('fullName', 'Имя должно быть минимум 3 символа').isLength({
  min: 3
}), (0, _expressValidator.body)('avatarUrl', 'Неверная ссылка на аватар').optional().isURL()];
exports.registerValidation = registerValidation;
var postCreateValidation = [// создаем массив с проверками вводимых данных
(0, _expressValidator.body)('title', 'Введите заголовки статьи').isLength({
  min: 3
}).isString(), (0, _expressValidator.body)('text', 'Введите текст статьи').isLength({
  min: 5
}).isString(), (0, _expressValidator.body)('tags', 'Неверный формат тэгов (укажите массив)').optional().isString(), (0, _expressValidator.body)('imageUrl', 'Неверная ссылка на изображение').optional().isString()];
exports.postCreateValidation = postCreateValidation;