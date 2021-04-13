//init dbLink
const mongoose = require('mongoose');
const requireAll = require('require-all')
const path = require('path')

requireAll({
  dirname: path.join(__dirname, './'),
  filter: /(.+)\.model\.js$/,
})

const User = mongoose.model('users');
const Task = mongoose.model('task');

//connect to mongodb default: mongodb://127.0.0.1:27017/test
//mongoose.connect("mongodb://127.0.0.1:27017/zhao");
mongoose.connect("mongodb+srv://mgdbLubie:259117@cluster-imm-webdev.sqalf.mongodb.net/taskidb?retryWrites=true&w=majority");

const db = mongoose.connection;

//mongoose.connection two functions，error and open Represents connection failure and connection success
db.on('error',(error) => console.log('Mongo connection error'+error));
db.once('open',() => console.log('Mongo connection successed'));
