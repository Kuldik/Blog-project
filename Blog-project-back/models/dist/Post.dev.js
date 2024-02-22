"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PostSchema = new _mongoose["default"].Schema({
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
    "default": []
  },
  viewsCount: {
    type: Number,
    "default": 0
  },
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    // ID
    ref: 'User',
    // По ID будет ссылаться на юзера
    required: true
  },
  ImageUrl: String // так стоит указывать в случаях когда пользователю не обязателньо это указывать/заполнять/загружать

}, {
  timestamps: true // дата создания и обновления

});

var _default = _mongoose["default"].model('Post', PostSchema);

exports["default"] = _default;