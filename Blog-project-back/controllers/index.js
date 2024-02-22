export { default as UserController } from './UserController.js';
export { default as PostController } from './PostController.js'

// Или если у вас много контроллеров и вы хотите автоматизировать импорт, можно использовать node.js для динамического импорта файлов:

import * as fs from 'fs';
import * as path from 'path';

const controllers = {};
const normalizedPath = path.join(__dirname, 'controllers');

fs.readdirSync(normalizedPath).forEach((file) => {
  if (file !== 'index.js') {
    const controller = require(`./controllers/${file}`);
    controllers[file.split('.')[0]] = controller;
  }
});

export default controllers;