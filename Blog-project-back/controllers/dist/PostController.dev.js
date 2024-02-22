"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.create = exports.remove = exports.getOne = exports.getAll = void 0;

var _Post = _interopRequireDefault(require("../models/Post.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAll = function getAll(req, res) {
  var posts;
  return regeneratorRuntime.async(function getAll$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Post["default"].find().populate({
            path: "user",
            select: ["name", "avatar"]
          }).exec());

        case 3:
          posts = _context.sent;
          res.json(posts);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: 'Не удалось получиь статью'
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getAll = getAll;

var getOne = function getOne(req, res) {
  var postId, finededAndUpdatedDocument;
  return regeneratorRuntime.async(function getOne$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          postId = req.params.id; // получаем идентификатор поста из параметров запроса

          _context2.next = 4;
          return regeneratorRuntime.awrap(_Post["default"].findOneAndUpdate({
            _id: postId
          }, {
            $inc: {
              viewsCount: 1
            } // в MongoDB $inc - увеличивает значение, в нашем случае, в поле viewsCount на 1

          }, {
            returnDocument: 'after' // третьим параметром возвращает документ после обновления

          }));

        case 4:
          finededAndUpdatedDocument = _context2.sent;

          if (finededAndUpdatedDocument) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: 'Статья не найдена'
          }));

        case 7:
          res.json(finededAndUpdatedDocument);
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).json({
            message: 'Не удалось получить статью'
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.getOne = getOne;

var remove = function remove(req, res) {
  var postId, deletedDocument;
  return regeneratorRuntime.async(function remove$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          postId = req.params.id; // получаем идентификатор поста из параметров запроса

          _context3.next = 4;
          return regeneratorRuntime.awrap(_Post["default"].findOneAndDelete({
            _id: postId
          }));

        case 4:
          deletedDocument = _context3.sent;

          if (deletedDocument) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Статья не найдена'
          }));

        case 7:
          res.json({
            success: true
          });
          _context3.next = 14;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).json({
            message: 'Не удалось удалить статью'
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.remove = remove;

var create = function create(req, res) {
  var doc, post;
  return regeneratorRuntime.async(function create$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          doc = new _Post["default"]({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
          });
          _context4.next = 4;
          return regeneratorRuntime.awrap(doc.save());

        case 4:
          post = _context4.sent;
          res.json(post);
          _context4.next = 12;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).json({
            message: 'Не удалось создать статью'
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.create = create;

var update = function update(req, res) {
  var postId;
  return regeneratorRuntime.async(function update$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          postId = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_Post["default"].updateOne( // Находим одну статью и обновляем ее
          {
            _id: postId
          }, {
            // указываем что конкретно будем обновлять 
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            tags: req.body.tags
          }));

        case 4:
          res.json({
            success: true
          });
          _context5.next = 11;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).json({
            message: 'Не удалось обновить статью'
          });

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.update = update;