const express = require('express');
const db = require('./config/connection');
const { User, Group } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create a user, and assign that user to a group
// req.body:  { name, email, groupName }
app.post("/user", async (req, res) => {
  const newUser = await User.create({ name: req.body.name, email: req.body.email })
  // find the specified group, and add this new user to the users array 
  const updatedGroup = await Group.findOneAndUpdate(
    { name: req.body.groupName },
    { $push: { users: newUser._id } },
    { new: true }
  )
  res.status(200).json(updatedGroup)
})

app.get("/group", async (req, res) => {
  const allGroups = await Group.find({}).populate("users")
  res.status(200).json(allGroups)
})


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
