const mongoose = require('mongoose');
const sessions = new mongoose.Schema({
    cookie: {
        originalMaxAge: Number,
        expires: Number,
        httpOnly: Boolean,
        path: String
    },
    sessId: String,
    passport: {
        user: {
            username: String,
            password: String,
            _id: String
        }
    }
});

module.exports = (connect) => {
    class MongoStore extends connect.Store {
        constructor(options) {
            super();
            this.url = options.url;
            this.db = mongoose.createConnection(this.url);
            this.db.on('error', err => console.log('connection error with MongoStore', err.message));
            this.db.once('open', callback => console.log('connected to MongoStore'));
            this.sessionModel = this.db.model('sessions', sessions);
        }

        get(sid, callback) {
            this.sessionModel.findOne({sessId: sid}, (err, session) => callback(err, session));
        }

        set(sid, session, callback) {
            const sess = session;
            sess.sessId = sid;
            this.sessionModel.findOneAndUpdate({sessId: sid}, {$set: sess}, {upsert: true}, err => {
                callback(err, {updated: 1});
        });
        }

        destroy(sid) {
            console.log('destroying by SID:', sid);
            this.sessionModel.findOneAndRemove({sessId: sid}, err => !err ? console.log('deleted') : console.log(err));
        }
    }

    return MongoStore;
};