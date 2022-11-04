const express = require('express');
const db = require('./config/connection');
const User = require('./models/User');
const Thought = require('./models/Thoughts');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//get all
app.get('/user',async(req,res)=>{
  try{
    const allusers=await User.find({})
    res.status(200).json(allusers)
  }catch(err){
    res.status(500).json(err);
  }
});

// get by id
app.get('/user/:id',async(req,res)=>{
  try{
    const allusers=await User.find({})
    res.status(200).json(allusers)
  }catch(err){
    res.status(500).json(err);
  }
});
//create user
app.post("/user", async (req, res) => {
  try{
    const newUser = await User.create( req.body )
    res.status(200).json(newUser)
  }catch(err){
    res.status(500).json(err);
  }
});
//update user by id
app.put("/user/:id", async (req, res) => {
  try{
    const updatedUser = await User.findOneAndUpdate(
       req.params.id ,
       req.body,
      { new: true },
    )
    res.status(200).json(updatedUser)
  }catch(err){
    res.status(500).json(err);
  }
});
//delete user by id
app.delete('/user/:id', async (req, res) => {
  try{
    const result = await User.findOneAndDelete( req.params.id )
    res.status(200).json(result);
  }catch(err){
    res.status(500).json(err);
  }
});




//get all thoughts
app.get('/thought',async(req,res)=>{
  try{
    const allThoughts=await Thought.find({})
    res.status(200).json(allThoughts)
    
  }catch(err){
    console.log(err)
    res.status(500).json(err);
  }
});

// get thought by id
app.get('/thought/:id',async(req,res)=>{
  try{
    const allThoughts=await Thought.find({})
    res.status(200).json(allThoughts)
  }catch(err){
    res.status(500).json(err);
  }
})
//create thought
app.post("/thought", async (req, res) => {
  try{
    const newThought = await Thought.create( req.body )
    const insert= await User.findOneAndUpdate(
      { _id:req.body.userId}, 
      {$push:{thoughts:newThought._id}},
      {new:true}
    )
    console.log(insert)
    res.status(200).json(insert)
  }catch(err){
    res.status(500).json(err);
  }
});
// update thought
app.put("/thought/:id", async (req, res) => {
  try{
    const updatedThought = await Thought.findOneAndUpdate(
       req.params.id , //need to test this
       req.body,
      { new: true },
    )
    res.status(200).json(updatedThought)
  }catch(err){
    res.status(500).json(err);
  }
});
//delete thought
app.delete('/thought/:id', async (req, res) => {
  try{
    const result = await Thought.findOneAndDelete( req.params.id )
    res.status(200).json(result);
  }catch(err){
    res.status(500).json(err);
  }
});

app.put('/user/:userId/friend/:friendId',async(req,res)=>{
  try{
    
  }catch(err){
    res.status(500).json(err);
  }
})






db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
