var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json()); // for parsing application/json
var users = [
  {
    id: 1,
    name: 'Anna',
    age: 29,
    department: 'market',
    entitle: 'CEO',
  },
  {
    id: 2,
    name: 'Tom',
    age: 28,
    department: 'QA',
    entitle: 'manager',
  },
  {
    id: 3,
    name: 'Puck',
    age: 29,
    department: 'tech',
    entitle: 'CTO',
  },
  {
    id: 4,
    name: 'Puck',
    age: 29,
    department: 'operation',
    entitle: 'COO',
    workfor: 'money',
  },
]
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});

app.get('/api/getUsers', function(req, res){
  console.log('getUsers')
  res.send({
    list: users,
  });
})

app.post('/api/addUser', function (req, res) {
  console.log(req.body);
  users.push(Object.assign({}, {id: users.length+1}, req.body));
  res.send({
    meta: 'ok'
  });
});