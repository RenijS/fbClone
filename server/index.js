const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
require("dotenv").config();

const initialize = require("./passport-config");
initialize(passport);

app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.REACT_APP_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(process.env.REACT_APP_SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect("mongodb://localhost:27017/mern_facebook")
  .then(() => {
    console.log("Mongo Conection Open!");
  })
  .catch((err) => {
    console.log("Mongo ERROR: ", err);
  });

app.get("/test", (req, res) => {
  res.send("Server test is running");
});

app.post("/api/register", async (req, res) => {
  // try {
  //   const hashedPassword = await bcrypt.hash(req.body.password, 10);
  //   await User.create({
  //     firstName: req.body.firstName,
  //     lastName: req.body.lastName,
  //     email: req.body.email,
  //     password: hashedPassword,
  //   });
  //   res.json({ status: "ok" });
  //   res.redirect("/login");
  // } catch (err) {
  //   res.json({ status: "error", error: "wrong" });
  //   console.log(err);
  // }

  User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) {
      res.json({ status: "error", error: "wrong" });
      throw err;
    }
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

app.post("/api/login", async (req, res, next) => {
  // const user = await User.findOne({ ...req.body });

  // if (user) {
  //   const token = jwt.sign(
  //     { firstName: user.firstName, lastName: user.lastName, email: user.email },
  //     "secret123"
  //   );
  //   return res.json({ status: "ok", user: true });
  // } else {
  //   return res.json({ status: "ok", user: false });
  // }
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        console.log("Successfully Authenticated");
        console.log(req.user);
        res.send(req.user);
      });
    }
  })(req, res, next);
});

app.listen(9000, () => {
  console.log("Listening server at 9000");
});
