import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import {viewAllUsers, viewUserForm, viewUserById, insertUser, editUserById, deleteUserById} from "../controllers/user.controller.js";

const router = express.Router();

router.use(express.static("public"));
router.use(bodyParser.urlencoded({ extended: true }));

//Storage and filename settings
const storage = multer.diskStorage({
  destination: "public/images/",
  filename: (req, file, cb)=>{
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage
});

router.get("/", viewAllUsers);

router.get("/add_user", viewUserForm);

router.get("/edit_user/:id", viewUserById);

router.post("/submit", upload.single("image"), insertUser);

router.post("/edit/:id", upload.single("image"), editUserById);

router.get("/delete/:id", deleteUserById);

export {router};