"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _callee = function _callee(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = (req.headers.authorization || '').replace(/Bearer\s?/, ''); // убирает слово Bearer из токена

          if (!token) {
            _context.next = 13;
            break;
          }

          _context.prev = 2;
          decoded = _jsonwebtoken["default"].verify(token, 'secret123'); // расшифровка пароля

          req.userId = decoded._id; // получение расшифрованного пароля

          next();
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", res.status(403).json({
            message: 'Нет доступа'
          }));

        case 11:
          _context.next = 14;
          break;

        case 13:
          return _context.abrupt("return", res.status(403).json({
            message: 'Нет доступа'
          }));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 8]]);
};

exports["default"] = _callee;