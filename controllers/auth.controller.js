import Auth from "../model/auth.model.js";
import passport from "passport";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
const __dirname = dirname(fileURLToPath(import.meta.url));
const saltRounds = 10;

const insertAdmin = async (req, res)=>{
    // bcrypt hasing process
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    const newAdmin = new Auth({
        username: req.body.username,
        password: hash
    });
    newAdmin.save();
    res.render(__dirname + "/../view/login.ejs");
    });
};

const loginAdmin = async (req, res)=>{
    const user = new Auth({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function(err){
        if(err){
            console.log(err);
            res.redirect("/signup");
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/");
            });
        }
    });
};

const adminLogout = async (req ,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
};

const viewLoginForm = (req, res) => {
    res.render(__dirname + "/../view/login.ejs");
};

const viewSignupForm = (req, res) => {
    res.render(__dirname + "/../view/signup.ejs");
};

export {insertAdmin, loginAdmin, adminLogout, viewLoginForm, viewSignupForm};