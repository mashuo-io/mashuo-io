var passport = require('koa-passport');

var user = { id: 1, username: 'test' }

//passport.serializeUser(function(user, done) {
//    console.log('serializeUser');
//    done(null, user.id)
//})
//
//passport.deserializeUser(function(id, done) {
//    console.log('deserializeUser');
//    done(null, user)
//})
var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
        clientID: "34de227893b92e96f645",
        clientSecret: "5a6250dfcefb1e861d8c761c3948a92a5262e4be",
        callbackURL: "http://127.0.0.1:3000/api/auth/github/callback",
        session: false
    },
    function(accessToken, refreshToken, profile, done) {
        //User.findOrCreate({ githubId: profile.id }, function (err, user) {
        //    return done(err, user);
        //});
        console.log(profile.photos[0].value,profile.emails[0].value, accessToken, refreshToken)
        done(null, user);
    }
));

module.exports = {
    oauthGithub: function* () {
        yield passport.authenticate('github', { session: false });
    },

    oauthGithubCallback: function* (next){
        console.log(this.query);
        //yield passport.authenticate('github', {
        //    successRedirect: 'http://127.0.0.1:8080/auth?token=' + token,
        //    failureRedirect: 'http://127.0.0.1:8080/Video',
        //    session: false
        //});
        this.body = `
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Mashuo</title>
            </head>
            <body>
                <script>
                    alert('hello');
                    window.close();
                </script>
            </body>
            </html>
        `;
    }
}