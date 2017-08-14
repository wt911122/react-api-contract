import {testAPI1} from 'mockAPI';
import {ConfigFactory} from '../src/APIStore';

const api = ConfigFactory(testAPI1);
api.fetch({
  pathParam: 2,
  query: {
    page: 2,
  },
  body:{
    age: 43,
  }
});