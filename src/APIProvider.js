import { Component, Children } from 'react';
import PropTypes from 'prop-types';

export default class APIProvider extends Component {
  constructor(props, context) {
    super(props, context)
    this.pool = props.pool
  }

  getChildContext() {
    return  { pool: this.pool }
  }

  render() {
    return Children.only(this.props.children)
  }
}


APIProvider.propTypes = {
  pool: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
}
APIProvider.childContextTypes = {
  pool: PropTypes.object.isRequired,
}