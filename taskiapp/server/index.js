const api = require('./api');
//operate files，r/w doc
const fs = require('fs');
const path = require('path');
//Analyze the data sent by the front end
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);
// express.static Used to handle static resources
app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('*', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})
app.listen(8011);
console.log('success listen......');