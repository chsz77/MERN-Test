const express = require('express');
const router = express.Router();
const Record = require('../../models/Record');
const Patient = require('../../models/Patient');
const User = require('../../models/User');
const passport = require('passport');


//GET all patient
router.get('/patients', passport.authenticate('jwt', {session: false}), (req, res) => {
    if(req.user.user_type !== 'Doctor' && req.user.user_type !== 'Admin'){
        return res.json({msg: "No can do"})
    } else {
    Patient.find()
        .sort({name: 1})
        .populate('patient', ['name'])
        .then(records => res.json(records))
        .catch(err => res.send(err))
    }
})


// SHOW single patient records
router.get('/patients/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Patient.findOne({patient: req.params.id})
      .populate('patient', ['name', 'user_type'])
      .populate({path: 'records', options: { sort: { 'created_at': -1 } } })
      .then(patient => res.json(patient))
      .catch(err => res.send(err))
})

//New Patient
router.post('/patients', passport.authenticate('jwt', {session: false}), (req, res) => {
  req.body.patient = req.user.id
  Patient.create(req.body, (err, data) => {
      if(err){
          console.log(err)
      } else {
          User.findByIdAndUpdate(req.user.id, {registered: true})
          .then(user => res.json(user))
          .catch(err => console.log(err))
      }
  } )
})


// Record Routes
//GET SINGLE RECORD
router.get('/patients/:id/records/:recordId', passport.authenticate('jwt', {session: false}), (req, res) => {
  Record.findById(req.params.recordId)
      .then(record => res.json(record))
      .catch(err => res.send(err))
})

//POST New RECORD
router.post('/patients/:id/records', passport.authenticate('jwt', {session: false}), (req, res) => {
    Patient.findOne({patient: req.params.id}, (err, patient) => {
        if(err){
            console.log(err);
        } else {
            req.body.doctor = req.user.name
            Record.create(req.body, function(err, record){
                if(err){
                    console.log(err);
                } else {
                    patient.records.push(record);
                    patient.save()
                        .then(record => res.status(201).json(record))
                        .catch(err => console.log(err))
                }
            })
        }
        
    })
})

//Delete patient
router.delete('patients/:id', (req, res) => {
    Patient.findOne({patient: req.params.id}, (err, patient) => {
        if(err){
            console.log(err)
        } else {
            patient.records.map(record => Record.findByIdAndRemove(record._id))
                .then(patient.remove())
                .catch(err => console.log(err))
        }
    })
})


// //DELETE
// router.delete('/patients/:id/records/:recordId', (req, res) => {
//     Record.findByIdAndRemove(req.params.recordId)
//         .then(()=>res.json({success: true}))
//         .catch(err => console.log(err))
// })

module.exports = router;