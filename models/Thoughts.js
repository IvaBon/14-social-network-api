const { Schema, model } = require("mongoose")


const thoughtSchema = new Schema({
  thoughtText:{
    type: String,
    required:true,
    minlength:1,
    maxlength:280
  }
})

const Thought = model("Thought", thoughtSchema)

module.exports = Thought;