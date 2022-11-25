const express = require('express');
const path    = require('path');
const app     = new express();
const PORT    = 5000;

// ORIGIN ACCESS OF REQUESTES
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// VIEWS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/js',     express.static(path.join(__dirname, 'public/js_scripts')));
app.use('/css',    express.static(path.join(__dirname, 'public/stylesheets')));

// ROUTER
app.use(require('./routes/route.js'));

app.listen(PORT);
console.log(`Port is listen on: `, PORT);

