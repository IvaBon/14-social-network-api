const express = require('express');
const db = require('./config/connection');
const User = require('./models/User');
const Thought = require('./models/Thoughts');
const { isObjectIdOrHexString } = require('mongoose');

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
    const allusers=await User.findById(req.params.id)
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
    const updatedUser = await User.findByIdAndUpdate(
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
    const result = await User.findByIdAndRemove( req.params.id )
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
    const allThoughts=await Thought.findById(req.params.id)
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
    const updatedThought = await Thought.findByIdAndUpdate(
       req.params.id , 
       req.body,
      { new: true },
    )
    console.log(updatedThought)
    res.status(200).json(updatedThought)
  }catch(err){
    res.status(500).json(err);
  }
});
//delete thought
app.delete('/thought/:id', async (req, res) => {
  try{
    const result = await Thought.findByIdAndDelete( req.params.id )
    res.status(200).json(result);
  }catch(err){
    console.log(err)
    res.status(500).json(err);
  }
});
//add friend
app.put('/user/:userId/friend/:friendId',async(req,res)=>{
  try{
    const addFriend=await User.findOneAndUpdate(
    {_id:req.params.userId},
    {$push:{friends:req.params.friendId}},
    {new:true}
    )
    res.status(200).json(addFriend);
  }catch(err){
    console.log(err)
    res.status(500).json(err);
  }
})
//del friend
app.delete('/user/:userId/friend/:friendId',async(req,res)=>{
  try{
    const delFriend=await User.findOneAndUpdate(
    {_id:req.params.userId},
    {$pull:{friends:req.params.friendId}},
    {new:true}
    )
    res.status(200).json(delFriend);
  }catch(err){
    console.log(err)
    res.status(500).json(err);
  }
})
//create reactino
app.put('/thought/:thoughtId/reaction',async(req,res)=>{
  try{
    const addReaction=await Thought.findOneAndUpdate(
    {_id:req.params.thoughtId},
    {$push:{reactions:req.body}},
    {new:true}
    )
    console.log(addReaction)
    res.status(200).json(addReaction);
  }catch(err){
    console.log(err)
    res.status(500).json(err);
  }
})
//delete reaction
app.delete('/thought/:thoughtId/reaction/:reactionId',async(req,res)=>{
  try{
    const delFriend=await Thought.findOneAndUpdate(
      {_id:req.params.thoughtId},
      {$pull:{reactions:{reactionId: req.params._id}}},
      {new:true}
    
    )
    console.log(delFriend)
    res.status(200).json(delFriend);
  }catch(err){
    console.log(err)
    res.status(500).json(err);
  }
})






db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
