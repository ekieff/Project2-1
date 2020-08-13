const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const db = require("../models");

//passport serializes youur info make it easier to login

passport.serializeUser((user, callback) =>
{
    callback(null, user.id);
});

passport.deserializeUser((id, callback) =>
{
    callback(null, id)
    .catch(callback());
});

passport.use(new localStrategy(
{
    usernameField: "email",
    passwordField: "password"
}, 
(email, password, callback) =>
{
    db.user.findOne(
    {
        where: 
        {
            email
        }
    })
    .then(user =>
    {
        if (!user || !user.validPassword(password))
        {
            callback(null, false);
        }
        else
        {
            callback(null, user);
        }
    })
    .catch(callback());
}));

module.exports = passport;