const { required } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const TodoModel = mongoose.model('events', todoSchema)
module.exports = TodoModel 
