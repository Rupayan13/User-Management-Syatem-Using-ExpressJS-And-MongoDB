import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import {insertAdmin, loginAdmin, adminLogout, viewLoginForm, viewSignupForm} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.use(express.static("public"));
authRouter.use(bodyParser.urlencoded({ extended: true }));


authRouter.get("/login", viewLoginForm);

authRouter.get("/signup", viewSignupForm);

authRouter.post("/loginPost", loginAdmin);

authRouter.post("/signupPost", insertAdmin);

authRouter.get("/logout", adminLogout);

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated){
        return next();
    }else{
        res.render(__dirname + "/../view/index.ejs");
    }
}

function checkNotAuthenticated(req, res, next){
    if(req.user==null){
      res.redirect("/login");
    }else{
      return next();
    }
}

export {authRouter, checkAuthenticated, checkNotAuthenticated};