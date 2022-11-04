const express = require('express');
const db = require('./config/connection');
const User = require('./models/User');
const Thought = require('./models/Thoughts');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/user',async(req,res)=>{
  try{
    const allusers=await User.find({})
    res.status(200).json(allusers)
  }catch(err){
    res.status(500).json(err);
  }
});

app.get('/user/:id',async(req,res)=>{
  try{
    const allusers=await User.find({})
    res.status(200).json(allusers)
  }catch(err){
    res.status(500).json(err);
  }
});

app.post("/user", async (req, res) => {
  try{
    const newUser = await User.create({ username: req.body.name, email: req.body.email })
    const updatedUser = await User.findOneAndUpdate(
      {  },
      { $push: { users: newUser._id } },
      { new: true }
    )
    res.status(200).json(updatedGroup)
  }catch(err){
    res.status(500).json(err);
  }
});

app.post("/user/:id", async (req, res) => {
  try{
    const newUser = await User.create({ username: req.body.name, email: req.body.email })
    const updatedUser = await User.findOneAndUpdate(
      {  },
      { $push: { users: newUser._id } },
      { new: true }
    )
    res.status(200).json(updatedGroup)
  }catch(err){
    res.status(500).json(err);
  }
});






db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
