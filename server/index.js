if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const initializePassport = require("./passport-config");
initializePassport(passport);

app.use(cors());
app.use(express.json());
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
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
  try {
    const hashedPassword = bcrypt.hash(req.body.password, 10);
    await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });
    res.json({ status: "ok" });
    res.redirect("/login");
  } catch (err) {
    res.json({ status: "error", error: "wrong" });
    console.log(err);
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({ ...req.body });

  if (user) {
    const token = jwt.sign(
      { firstName: user.firstName, lastName: user.lastName, email: user.email },
      "secret123"
    );
    return res.json({ status: "ok", user: true });
  } else {
    return res.json({ status: "ok", user: false });
  }
});

app.listen(9000, () => {
  console.log("Listening server at 9000");
});
