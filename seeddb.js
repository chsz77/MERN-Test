const mongoose = require("mongoose");
const Patient = require("./models/Patient");
const Record = require("./models/Record");
// const Doctor = require("./models/Doctor");

const data = [
    {
        name: "Cahya Isra"
    },
    {
        name: "Isra"
    },
    {
        name: "Cahya"
    }
]


// function seedDB(){
//     Doctor.create({
//         name: "Dr. Sanchez"
//     }, (err, doctor) => {
//         err ? console.log(err) : console.log("Added Doctor");
//         Patient.create({
//             name: 'Ali'
//         }, (err, patient)=>{
//             if(err){
//                 console.log(err)
//             } else {
//                 doctor.patients.push(patient);
//                 doctor.save();
//                 Record.create(
//                     {
//                         age: 27,
//                         condition: "Hell",
//                         indication: "Not Sick",
//                     }, (err, record) => {
//                         if(err){
//                             console.log("Record Failed")
//                         } else {
//                             patient.records.push(record);
//                             patient.save().then(console.log("Record Added"))   
//                         }
//                     }
//                 )
//             }
//         })
//     })
// }



function seedDB(){
    Record.remove({}, err => console.log(err));
    Patient.remove({}, err => {
        err ? console.log(err) : console.log("Removed Patient");
        data.forEach((seed)=>{
        Patient.create(seed, (err, patient) => {
            err ? console.log(err) : console.log("Added Data");
            Record.create(
                {
                    age: 21,
                    condition: "Hell",
                    indication: "Not Sick",
                }, (err, record) => {
                    if(err){
                        console.log("Record Failed")
                    } else {
                        patient.records.push(record);
                        patient.save().then(console.log("Record Added"))   
                    }
                }
            )
        })
    })    
    });
    
}

module.exports = seedDB
