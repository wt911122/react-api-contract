'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testAPI1 = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testAPI1 = exports.testAPI1 = {
  name: '按情况查询',
  url: '/searchWithConditions',
  method: 'post',
  pathParam: _propTypes2.default.string.isRequired,
  query: {
    page: _propTypes2.default.number.isRequired,
    size: _propTypes2.default.number.isRequired
  },
  body: {
    department: _propTypes2.default.string,
    age: _propTypes2.default.number,
    entitle: _propTypes2.default.string,
    location: _propTypes2.default.string
  }
};