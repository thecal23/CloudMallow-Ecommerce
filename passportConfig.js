const { Admin } = require('./models/schemas');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy(async (username, password, done) => {
      try {
        const user = await Admin.findOne({ username: username });
        console.log("inside the localstrategy : ", user)
        if (!user) {
          return done(null, false);
        }
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, cb) => {
    console.log("we in the serialize", user)
    cb(null, user.id);
  });

  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await Admin.findOne({ _id: id });
      console.log("we in the deserialize", user)
      cb(null, user);
    } catch (err) {
      console.log(err)
      cb(err);
    }
  });
};
