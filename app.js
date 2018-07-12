const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const main = require('./routes/api/main');
const users = require('./routes/api/users');
const passport = require('passport');


const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
const db = 'mongodb://chsz77:123xx456@ds151530.mlab.com:51530/react';
const Record = './models/Record';
const seedDB = require('./seeddb')

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(db,  { useNewUrlParser: true })
    .then(()=>console.log('Database connected'))
    .catch(err => console.log(err));

//Pasport
app.use(passport.initialize())
require('./config/passport')(passport)
    
//use routes
app.use('/api/main', main)
app.use('/api/users', users);

app.use(express.static(path.join(__dirname + '/client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})
// seedDB()
    
app.listen(port, () => console.log(`Started on ${port}`));

    