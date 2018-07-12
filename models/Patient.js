const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('debug', true)

const PatientSchema = new Schema({
    patient:{
            type:Schema.Types.ObjectId,
            ref: 'User'
        },
    age: Date,
    blood: String,
    sex: {type: String, enum:['Male', 'Female'], default: 'Male'},
    phone: String,
    email: String,
    photo: String,
    address: String,
    records: [
        {
            type:Schema.Types.ObjectId,
            ref: 'Record'
        }
    ],
    created_at: {type: Date, default: Date.now},
    last_record: Date
})

PatientSchema.pre('save', function(next) {
    this.last_record = Date.now();
    return next();
});

module.exports = mongoose.model('Patient', PatientSchema);