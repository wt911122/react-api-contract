/*import APIconnect from './src/APIconnect';
import APIProvider from './src/APIProvider';
import APIStore from './src/APIStore';

export {
  APIconnect,
  APIProvider,
  APIStore
}*/

import PropTypes from 'prop-types';

const myPropTypes = {
  name: PropTypes.string,
  age: PropTypes. number,
  // ... define your prop validations 
};
 
const props = {
  name: 'hello', // is valid 
  age: 'world', // not valid 
};
 
// Let's say your component is called 'MyComponent' 
 
// Works with standalone PropTypes 
try{
  PropTypes.checkPropTypes(myPropTypes, props, 'query', 'test API');
}catch(e){
  console.log(e);
}

// This will warn as follows: 
// Warning: Failed prop type: Invalid prop `age` of type `string` supplied to 
// `MyComponent`, expected `number`. 