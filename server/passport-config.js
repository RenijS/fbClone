const User = require("./models/user");
const bcrypt = require("bcryptjs");

const LocalStrategy = require("passport-local").Strategy;

function initialize(passport, getUserByEmail) {
  const authenticateUser = async (email, password, done) => {
    const user = User.findOne({ email: email }, (err, user) => {
      if (err) throw err;
      else if (!user)
        return done(null, false, { message: "No user with that email" });
    });
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });

  module.exports = initialize;
}
