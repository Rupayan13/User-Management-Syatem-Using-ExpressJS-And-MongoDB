import User from "../model/user.model.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const viewAllUsers = async (req, res) => {
    try {
      const usersAll = await User.find({});
      res.render(__dirname + "/../view/index.ejs", { newUserList: usersAll, user: req.user});
    } catch (err) {
      console.log(err);
    }
};

const viewUserForm = (req, res) => {
    res.render(__dirname + "/../view/add_user.ejs", {user: req.user});
};

const viewUserById = async (req, res)=>{
    const userId = req.params.id;
        try {
          const userFind = await User.findOne({_id: userId});
          res.render(__dirname + "/../view/add_user.ejs", 
          { 
            id: userId,
            name: userFind.name,
            email: userFind.email,
            image: userFind.image,
            user: req.user
          });
        } catch (err) {
          console.log(err);
        }
};

const insertUser = async (req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const image = req.file.filename;
    const newUser=new User({
        name: name,
        email: email,
        image: image
    });
    newUser.save();
    res.redirect("/");
};

const editUserById = async (req, res)=>{
    const userId = req.params.id;
    const newName = req.body.name;
    const newEmail = req.body.email;
    let newImage="";
    if(req.file){
      newImage = req.file.filename;
    }else{
      try {
        const userFind = await User.findOne({_id: userId});
        newImage = userFind.image;
      } catch (err) {
        console.log(err);
      }
    }
        try {
          const userFind = await User.updateOne({_id: userId}, {$set: {name: newName, email: newEmail, image: newImage}});
          console.log(userFind);
          res.redirect("/");
        } catch (err) {
          console.log(err);
        }
};

const deleteUserById = async (req, res)=>{
    const userId = req.params.id;
        try {
          const userDelete = await User.deleteOne({_id: userId});
          console.log(userDelete);
          res.redirect("/");
        } catch (err) {
          console.log(err);
        }
};

export {viewAllUsers, viewUserForm, viewUserById, insertUser, editUserById, deleteUserById};