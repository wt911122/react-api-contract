'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigFactory = exports.combineAPI = exports.APIProvider = exports.APIconnect = undefined;

var _APIconnect = require('./APIconnect');

var _APIconnect2 = _interopRequireDefault(_APIconnect);

var _APIProvider = require('./APIProvider');

var _APIProvider2 = _interopRequireDefault(_APIProvider);

var _APIStore = require('./APIStore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.APIconnect = _APIconnect2.default;
exports.APIProvider = _APIProvider2.default;
exports.combineAPI = _APIStore.combineAPI;
exports.ConfigFactory = _APIStore.ConfigFactory;