let LocalStrategy = require('passport-local').Strategy;
let brcrypt = require('bcrypt');
let models = require('./models')
const validPassword = (user, password) => {
    return brcrypt.compareSync(password, user.password)
}

module.exports = function(passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        models.User.findOne({
            where: {
                'id': id
            }
        }).then(user => {
            if (user === null) {
                done(new Error('Wrong user id'))
            }
            done(null, user)
        })
    })
    passport.use(new LocalStrategy({
        usernameField: "email",
        passportField: "password",
        passReqToCallback: true
    },
    ((email, password, done) => {
        return models.User.findOne({
            where: {
                "email": email
            }
        }).then(user => {
            if (user == null) {
                req.flash('message', 'Incorrect credentials')
                return done(null, false)
            } else if (user.password == null || user.password == undefined) {
                req.flash('message', 'You must reset your password')
                return done(null, false)
            } else if (!validPassword(user, password)) {
                req.flasg('message', 'Incorrect credentials')
                return done(null, false)
            }
            return done(null, user)
        }).catch(e => {
            done(err, false)
        })
    })))
}