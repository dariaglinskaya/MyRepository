const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../mongo/db').userModel;

module.exports = (passport) => {
    passport.use('login', new LocalStrategy({
     	passReqToCallback: true
    },
		(req, username, password, done) => {
            userModel.findOne({username: username}, (err, user) => {
            	if (err)
            		return done(err);
    			if (!user) {
        			console.log('User Not Found with username ' + username);
        			return done(null, false, {message: 'user not found.'});
    			}
    			if (password !== user.password) {
        			console.log('Invalid Password');
        			return done(null, false, {message: 'incorrect password.'});
    			}
    			done(null, user);
           });
    }));
};
