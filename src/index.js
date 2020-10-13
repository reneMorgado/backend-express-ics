const homeRoute = require('./routes/home')
const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use('/static', express.static(__dirname + '/public'));
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use('/', homeRoute);

app.listen(port, () => {
    console.log('Running on ' + port);
})