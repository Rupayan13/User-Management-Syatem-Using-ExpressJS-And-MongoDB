import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    username: String,
    password: String
});
  
const Auth = mongoose.model("Auth", authSchema);
export default Auth;