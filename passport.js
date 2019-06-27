const localStratergy = require("passport-local").Strategy;
const User = require("./db/User");

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new localStratergy((username, password, done) => {
      User.findOne({ username }, (err, doc) => {
        if (err) {
          done(err);
        } else {
          if (doc) {
            const isPasswordValid = doc.comparePassword(password, doc.password);

            if (isPasswordValid) {
              done(null, {
                username: doc.username,
                password: doc.password
              });
            } else {
              done(null, false);
            }
          } else {
            done(null, false);
          }
        }
      });
    })
  );
};
