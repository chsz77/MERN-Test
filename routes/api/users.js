const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport')
const keys = require('../../config/keys')

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
    if (!isValid) {
    return res.status(400).json(errors);
    }
    
    User.findOne({ username: req.body.username })
    .then(user => {
        if (user) {
          errors.username = 'User already exists';
          return res.status(400).json(errors);
        } else {
            const newUser = new User({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                user_type: req.body.user_type
            })
            
            bcrypt.genSalt(10, (err, salt) => {
                if(err) throw err;
                bcrypt.hash(newUser.password, salt, (err, hash) =>{
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
                })
            })   
        }
    })

    
})

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    const username = req.body.username;
    const password = req.body.password;
    
    User.findOne({username})
        .then(user => {
            if(!user) {
                return res.status(404).json({username: "User not found"});
                
            }
            
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        //User Matched
                        const payload = {id: user._id, name: user.name, username: user.username, user_type: user.user_type, registered: user.registered}
                        
                        //Sign Token
                        jwt.sign(
                            payload, 
                            keys.secretOrKey, 
                            {expiresIn: 10800}, 
                            (err, token) => {
                                err ? console.log(err) :
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            
                        })
                        
                    } else {
                        return res.status(400).json({password: "Password is incorrect"})
                    }
                    
                })
        })
})

//Protected Route
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({msg: "success"})
})


module.exports = router