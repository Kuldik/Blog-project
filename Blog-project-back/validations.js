import  {body}  from 'express-validator'

export const loginValidation = [ // создаем массив с проверками вводимых данных
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
];

export const registerValidation = [ // создаем массив с проверками вводимых данных
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
    body('fullName', 'Имя должно быть минимум 3 символа').isLength({min: 3}),
    body('avatarUrl', 'Неверная ссылка на аватар').optional().isURL()
];

export const postCreateValidation = [ // создаем массив с проверками вводимых данных
    body('title', 'Введите заголовки статьи').isLength({min: 3}).isString(),
    body('text', 'Введите текст статьи').isLength({min: 5}).isString(),
    body('tags', 'Неверный формат тэгов (укажите массив)').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString()
]