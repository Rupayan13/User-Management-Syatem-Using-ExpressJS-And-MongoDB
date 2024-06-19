import express from "express";
import mongoose from "mongoose";
import PORT from "./config/server.config.js";
import DB_URL from "./config/db.config.js";
import {router} from "./routes/routes.js";
import {authRouter} from "./routes/auth.route.js";
import session from "express-session";
import passport from "passport";
import passportLocal from "passport-local";
const localStrategy=passportLocal.Strategy;
import Auth from "./model/auth.model.js";

const app = express();

app.use(session({
  secret: "Our little Secret", 
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(DB_URL);

const db = mongoose.connection;

db.on("error" , ()=>{
    console.log('Error while connecting to the mongoDB')
});

db.once("open", ()=>{
    console.log("Connected to MongoDB");
});

passport.use(new localStrategy(Auth));
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
      });
    });
  });
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
});

app.use("/", router);
app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
