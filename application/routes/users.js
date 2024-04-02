var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const UserError = require('../helpers/error/UserError');



const db = require('../conf/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//method : POST 
// localhost:3000/users/register

router.post("/register", function(req, res, next) {
    const { username, email, password } = req.body;


    //server side Validation
    //check for dublicate
    db.query('select id from users where username=?', [username])
        .then(function([results, fields]) {
            if (results && results.length == 0) {
                return db.query('select id from users where email=?', [email])


            } else {
                throw new Error('Username already Exists');

            }

        }).then(function([results, fields]) {
            if (results && results.length == 0) {
                console.log(res.body);
                return bcrypt.hash(password, 2);
            } else {
                throw new Error('Email already Exists');
            }
        }).then(function(hashedPassword) {
            return db.query('insert into users (username, email, password) value (?, ?,?)', [username, email, hashedPassword])
        }).then(function([results, fields]) {
            if (results && results.affectedRows) {
                res.redirect('/login');
            } else {
                throw new Error('User could not be made');
            }
        })
        .catch(function(err) {

            next(err);

        });
    //insert into db
    //respond


});

//method: POST
//localhost:3000/users/login
router.post("/login", function(req, res, next) {
    const { username, password } = req.body;

    let loggedUserId;
    let loggedUsername;
    db.query('select id, username, password from users where username=?', [username])
        .then(function([results, fields]) {
            if (results && results.length == 1) {
                loggedUserId = results[0].id;
                loggedUsername = results[0].username;
                let dbPassword = results[0].password;
                return bcrypt.compare(password, dbPassword);

            } else {
                throw new UserError('Failed Login: Invalid user credentials', "/login", 200);


            }
        }).then(function(passwordMatched) {
            if (passwordMatched) {
                req.session.userId = loggedUserId;
                req.session.username = loggedUsername;
                req.flash("success", `Hi ${loggedUsername}, you are now logged In.`);
                req.session.save(function(saveErr) {
                    res.redirect('/');
                })

            } else {
                throw new UserError('Failed Login: Invalid user credentials', "/login", 200);

            }
        })
        .catch(function(err) {
            if (err instanceof UserError) {
                req.flash("error", err.getMessage());
                req.session.save(function(saveErr) {
                    res.redirect(err.getRedirectURL());
                })

            } else {
                next(err);
            }

        })
});

// router.post('/logout', (req, res, next) => {
//     req.session.destroy((err) => {
//         if (err) {
//             errorPrint("session could not be destroyed.");
//             next(err);
//         } else {
//             Successprint("Session was destroyed");
//             res.clearCookie("csid");
//             res.json({ status: "OK", message: "User was logged out" });
//         }
//     })

// });
router.post('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            errorPrint("session could not be destroyed.");
            next(err);

        } else {
            res.json({
                status: 200,
                message: "You have been logged out "
            });
        }
    })

});




module.exports = router;