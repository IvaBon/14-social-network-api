const { Schema, model } = require("mongoose")

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required:true,
    trimmed:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    match:[/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  toJSON:{
    virtuals:true,
  },
  id:false
})


userSchema.virtuals('friendCount').get(function(){
  return this.friends.lengths;
})


const User = model("User", userSchema);


// const newUser = User.create({
//   name: "User 1",
//   description: "Best User ever"
// })

module.exports = User;