import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import {
  APIProvider,
  combineAPI
} from './api-contract';

import ChildComp from './ChildComp'

const getUserAPI = {
  name: '查找所有用户',
  url: '/api/getUsers',
  method: 'get',
  response: {
    list: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      entitle: PropTypes.string.isRequired,
      department:PropTypes.string.isRequired,
      age:PropTypes.number.isRequired,
    })),
  }
}

const addUserAPI = {
  name: '增加新用户',
  url: '/api/addUser',
  method: 'post',
  body: {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    department: PropTypes.string.isRequired,
    entitle: PropTypes.string.isRequired,
  },
}

const store = combineAPI([
  getUserAPI,
  addUserAPI,
])

class App extends Component {
  render() {
    return (
      <APIProvider pool={store}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <ChildComp />
        </div>
      </APIProvider>
    );
  }
}

export default App;
