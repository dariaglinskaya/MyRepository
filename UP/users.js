const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');
const sessionStore = require('./passport/store')(expressSession);
const store = new sessionStore({url: 'mongodb://localhost:27017/vacant'});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(expressSession({
    name: 'login',
    secret: 'dariaglinskaya',
    resave: false,
    saveUninitialized: false,
    store: store
}));
router.use(passport.initialize());
router.use(passport.session());
require('./passport/init')(passport);

router.post('/login', passport.authenticate('login'), (req, res) => res.sendStatus(200));

router.get('/logout', (req, res) => {
    req.session.destroy();
res.sendStatus(200);
});

router.get('/isAuthorized', (req, res) => req.user ? res.send(req.user) : res.sendStatus(401));

module.exports = router;