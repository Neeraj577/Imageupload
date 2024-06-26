const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const sharp = require('sharp');
const db = require('../conf/database');

router.post("/create", function(req, res, next) {
    if (!req.session.userId) {
        res.json({
            status: "error",
            message: "Your must be logged in"
        });
    } else {
        let { comment, postId } = req.body;
        let { userId, username } = req.session;
        db.execute(`INSERT INTO comments (text, fk_authorId, fk_postId) value (?,?,?);`, [comment, userId, postId])
            .then(function([results, fields]) {
                if (results && results.affectedRows === 1) {
                    // res.redirect('/post/(\\d+');
                    res.json({
                        status: "success",
                        message: "Your comment was created",
                        data: {
                            comment: comment,
                            username: username,
                            commentId: results.insertId
                        }
                    })

                    // console.log("Comment is :", comment);


                } else {
                    res.json({
                        status: "error",
                        message: "Comment could not be created"
                    })
                }
            })
    }
})

module.exports = router;