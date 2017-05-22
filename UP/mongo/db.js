const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = mongoose.createConnection('mongodb://localhost:27017/vacant');

db.on('error', err => console.log('connection error to DB.', err.message));
db.once('open', callback => console.log('connected to DB'));

const articleModel = new mongoose.Schema({
    author: String,
    title: String,
    content: String,
    summary: String,
    createdAt: Date,
});

const userModel = new mongoose.Schema({
    username: String,
    password: String
});

module.exports.articleModel = db.model('articles', articleModel);
module.exports.userModel = db.model('users', userModel);