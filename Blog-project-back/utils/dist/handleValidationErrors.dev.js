"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _default = function _default(req, res, next) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (errors) {
    res.status(400).json(errors);
  } else {
    next();
  }
};

exports["default"] = _default;