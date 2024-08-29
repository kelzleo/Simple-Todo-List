const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/todb')
.then(() => {
    console.log('mongo connected')
})

.catch(() => {
    console.log('failed to connect')
})

const todoSchema = new Schema({
    todo: {
        type: String,
        required: true
    }
})

const todo = mongoose.model("todo", todoSchema)

module.exports = todo