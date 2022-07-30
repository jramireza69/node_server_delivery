const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Keys = require('./keys');
const User = require('../models/user');

module.exports = (passport) => {

    let opts = {};   //opts  = opciones
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');  //profundizar
    opts.secretOrKey = Keys.secretOrKey;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    
        User.findById(jwt_payload.id, (err, user) => { //f de callback

            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }

        });

    }));

}