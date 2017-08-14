'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connect;

var _react = require('react');

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function connect(mapAPIToProps) {
  if (!mapAPIToProps || typeof mapAPIToProps != 'function') {
    throw 'mapAPIToProps必须要定义且为函数';
    return;
  }

  return function wrapWithConnect(WrappedComponent) {
    const connectDisplayName = `APIConnect(${getDisplayName(WrappedComponent)})`;
    class APIConnect extends _react.Component {
      constructor(props, context) {
        super(props);

        this.state = props.pool || context.pool;
      }

      componentWillMount() {
        this.mergedProps = mapAPIToProps(this.state);
      }

      render() {
        const prop = Object.assign({}, this.props, this.mergedProps);
        return (0, _react.createElement)(WrappedComponent, prop);
      }
    }
    APIConnect.contextTypes = {
      pool: _react.PropTypes.object.isRequired
    };
    APIConnect.displayName = connectDisplayName;

    return APIConnect;
  };
}