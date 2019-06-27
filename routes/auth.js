const express = require("express");
const router = express.Router();
const User = require("../db/User");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = passport => {
  router.post("/signup", (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username }, (err, doc) => {
      if (err) {
        res.status(500).send("error occured");
      } else {
        if (doc) {
          res.status(500).send("error occured");
        } else {
          const record = new User();

          record.username = username;
          record.password = record.hashPassword(password);
          record.save((err, user) => {
            if (err) {
              res.status(500).send("db error");
            } else {
              res.send(user);
            }
          });
        }
      }
    });
  });

  router.post('/login', passport.authenticate('local',{
      failureRedirect:'/login',
      successRedirect: '/profile'
  }), (req , res )=>{
      res.send("hey ")
  })
  return router;
};
