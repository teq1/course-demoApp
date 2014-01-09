var passport = require('passport');

exports.account = function(req, res) {
    res.render('account', { user: req.user, students: req.students });
};

exports.getlogin = function(req, res) {
    res.render('login', { user: req.user, message: req.session.messages });
};

exports.admin = function(req, res) {
    res.send('access granted admin!');
};

exports.postlogin = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
            req.session.messages =  [info.message];
            console.log("no user: " + info.message );
            return res.redirect('/login')
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            if(info) {info.message = false;}
            console.log("login success! user: " + user.username);
            return res.redirect('/account');
        });
    })(req, res, next);
};

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};