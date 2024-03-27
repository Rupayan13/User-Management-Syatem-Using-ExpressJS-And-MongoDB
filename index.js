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

app.get("/", async (req, res) => {
        try {
          const usersAll = await User.find({});
          res.render(__dirname + "/view/index.ejs", { newUserList: usersAll });
        } catch (err) {
          console.log(err);
        }
});

app.get("/add_user", (req, res) => {
  res.render(__dirname + "/view/add_user.ejs");
});

app.get("/edit_user/:id", async (req, res)=>{
    const userId = req.params.id;
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
});

app.post("/submit", async (req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const newUser=new User({
        name: name,
        email: email
    });
    newUser.save();
    res.redirect("/");
});

app.post("/edit/:id", async (req, res)=>{
    const userId = req.params.id;
    const newName = req.body.name;
    const newEmail = req.body.email;
        try {
          const userFind = await User.updateOne({_id: userId}, {$set: {name: newName, email: newEmail}});
          console.log(userFind);
          res.redirect("/");
        } catch (err) {
          console.log(err);
        }
});

app.get("/delete/:id", async (req, res)=>{
    const userId = req.params.id;
        try {
          const userDelete = await User.deleteOne({_id: userId});
          console.log(userDelete);
          res.redirect("/");
        } catch (err) {
          console.log(err);
        }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
