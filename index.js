import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = {
  name: String,
  email: String,
};

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    async function showUser() {
        try {
          const usersAll = await User.find({});
          res.render(__dirname + "/view/index.ejs", { newUserList: usersAll });
        } catch (err) {
          console.log(err);
        }
    };
    showUser();
});

app.get("/add_user", (req, res) => {
  res.render(__dirname + "/view/add_user.ejs");
});

app.get("/edit_user/:id", (req, res)=>{
    const userId = req.params.id;
    async function findUser() {
        try {
          const userFind = await User.findOne({_id: userId});
          res.render(__dirname + "/view/add_user.ejs", 
          { 
            id: userId,
            name: userFind.name,
            email: userFind.email 
          });
        } catch (err) {
          console.log(err);
        }
    };
    findUser();
})

app.post("/submit", (req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const newUser=new User({
        name: name,
        email: email
    });
    newUser.save();
    res.redirect("/");
});

app.post("/edit/:id", (req, res)=>{
    const userId = req.params.id;
    const newName = req.body.name;
    const newEmail = req.body.email;
    async function findUserAndUpdate() {
        try {
          const userFind = await User.updateOne({_id: userId}, {$set: {name: newName, email: newEmail}});
          console.log(userFind);
          res.redirect("/");
        } catch (err) {
          console.log(err);
        }
    };
    findUserAndUpdate();
});

app.get("/delete/:id", (req, res)=>{
    const userId = req.params.id;
    async function deleteUser() {
        try {
          const userDelete = await User.deleteOne({_id: userId});
          console.log(userDelete);
          res.redirect("/");
        } catch (err) {
          console.log(err);
        }
    };
    deleteUser();
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
