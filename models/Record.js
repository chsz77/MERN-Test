const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('debug', true)
//create schema
const RecordSchema = new Schema ({
    symptomps: String,
    diagnosis: String,
    medication: String,
    prescription: [String],
    note: String,
    doctor: String,
    // doctor: {
    //   id: String,
      
    //   // id: {
    //   //   type: mongoose.Schema.Types.ObjectId,
    //   //   ref: "User"
    //   // },
    //   name: String
    // },
    created_at: {
        type:Date, default: Date.now
    }
})

module.exports = mongoose.model('Record', RecordSchema);