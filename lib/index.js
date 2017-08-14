'use strict';

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const myPropTypes = {
  name: _propTypes2.default.string,
  age: _propTypes2.default.number
  // ... define your prop validations 
}; /*import APIconnect from './src/APIconnect';
   import APIProvider from './src/APIProvider';
   import APIStore from './src/APIStore';
   
   export {
     APIconnect,
     APIProvider,
     APIStore
   }*/

const props = {
  name: 'hello', // is valid 
  age: 'world' // not valid 
};

// Let's say your component is called 'MyComponent' 

// Works with standalone PropTypes 
try {
  _propTypes2.default.checkPropTypes(myPropTypes, props, 'query', 'test API');
} catch (e) {
  console.log(e);
}

// This will warn as follows: 
// Warning: Failed prop type: Invalid prop `age` of type `string` supplied to 
// `MyComponent`, expected `number`.