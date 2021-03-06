// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
// expose this function to our app using module.exports
module.exports = function(passport, pool) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        pool.getConnection(function(err, connection) {
            connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
                connection.release();
                done(err, rows[0]);
            }); 
        });
        
    });

    

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
                    connection.release();
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                    }

                    // console.log(rows);
    
                    // if the user is found but the password is wrong
                    // if (!bcrypt.compareSync(password, rows[0].password))
                    //     return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
    
                    // all is well, return successful user
                    // 
                    var user = JSON.parse(JSON.stringify(rows[0]));
                    if (user.last_name==null) {
                        user.last_name = "";
                    }
                    // console.log("user",user);
                    return done(null, user);
                });
            });

        })
    );
};