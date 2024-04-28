const express = require("express")
const app = express()

const name = "50655hakim";
const password = "x0ydY3tWQBR5LTAU";
const link = `mongodb+srv://${name}:${password}@cluster0.3pabbf6.mongodb.net/mernproject?retryWrites=true&w=majority&appName=Cluster0`

// db connect 
const mongoose = require("mongoose")
mongoose.connect(link)

//user model import 
const UserModel = require("./models/Users")

// cors 
const cors = require("cors")
app.use(cors())

app.use(express.json())



app.get("/users", async (req,res)=>{
    const users  = await UserModel.find();
    return res.json(users);
})

app.post("/createUser",async (req,res)=>{
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    return res.json(user);

})

app.listen("3000",()=>{
    console.log("server works ");
})