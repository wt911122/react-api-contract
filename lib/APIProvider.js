'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class APIProvider extends _react.Component {
  constructor(props, context) {
    super(props, context);
    this.pool = props.pool;
  }

  getChildContext() {
    return { pool: this.pool };
  }

  render() {
    return _react.Children.only(this.props.children);
  }
}

exports.default = APIProvider;
APIProvider.propTypes = {
  pool: _propTypes2.default.object.isRequired,
  children: _propTypes2.default.element.isRequired
};
APIProvider.childContextTypes = {
  pool: _propTypes2.default.object.isRequired
};