const login = require('./login');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        console.log('logged user: ', user.username);
    done(null, user);
});

    passport.deserializeUser((user, done) => {
        const err = user ? null : new Error('deserializing error');
    console.log('deserialized user:', user.username);
    done(err, user.username);
});

    login(passport);
};