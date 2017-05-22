const express = require('express');
const app = express();
const article = require('./article');
const users = require('./users');

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));
app.use('/article', article);
app.use('/users', users);
app.listen(app.get('port'), () => console.log('Node app is running on port', app.get('port')));