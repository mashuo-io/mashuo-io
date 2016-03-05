var passport = require('koa-passport');

var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
        clientID: "34de227893b92e96f645",
        clientSecret: "5a6250dfcefb1e861d8c761c3948a92a5262e4be",
        callbackURL: "http://127.0.0.1:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        //User.findOrCreate({ githubId: profile.id }, function (err, user) {
        //    return done(err, user);
        //});
        done(null, user);
    }
));

module.exports = {
    oauthGithub: function *() {
        yield passport.authenticate('github');
    },

    oauthGithubCallback: function*(){
        yield passport.authenticate('github', {
            successRedirect: 'http://127.0.0.1:8080/Home',
            failureRedirect: 'http://127.0.0.1:8080/Video'
        })
    }
}