import { Component, createElement, PropTypes } from 'react';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default function connect(mapAPIToProps) {
  if(!mapAPIToProps || typeof mapAPIToProps != 'function') {
    throw 'mapAPIToProps必须要定义且为函数';
    return;
  }


  return function wrapWithConnect(WrappedComponent) {
    const connectDisplayName = `APIConnect(${getDisplayName(WrappedComponent)})`
    class APIConnect extends Component {
      constructor(props, context) {
        super(props);

        this.state = props.pool || context.pool;
      }

      componentWillMount() {
         this.mergedProps = mapAPIToProps(this.state);
      }

      render() {
        const prop = Object.assign({}, this.props, this.mergedProps);
        return createElement(WrappedComponent, prop);
      }
    }
    APIConnect.contextTypes = {
      pool: PropTypes.object.isRequired,
    }
    APIConnect.displayName = connectDisplayName;

    return APIConnect;
  }
}

