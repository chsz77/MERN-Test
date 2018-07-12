const mongoose = require("mongoose");
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {type: String, required: true},
    name: String,
    password: String,
    user_type: {type: String, required: true, enum: ['Doctor', 'Patient', 'Admin'], default: 'Patient'},
    registered: {type: Boolean, default: false}
})

module.exports = mongoose.model("User", UserSchema)