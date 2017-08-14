'use strict';

var _mockAPI = require('./mockAPI');

var _APIStore = require('../lib/APIStore');

const api = (0, _APIStore.ConfigFactory)(_mockAPI.testAPI1);
api.fetch({
  pathParam: 2,
  query: {
    page: 2
  },
  body: {
    age: 43
  }
});