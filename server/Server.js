const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const serverfunctions = require('./ServerFunctions');
const passport = require('../server/passport/passport');


//Body parser middleware
app.use(bodyParser.json());

//cors middleware
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

//get request at show
app.post('/show',serverfunctions.searchHandler);

//get request at login
app.post('/login',passport.passport.authenticate("local", {session: false}), serverfunctions.loginHandler);

//get request at register
app.post('/register',serverfunctions.registerHandler);

//server listening at PORT 3001
app.listen(3001,()=>{
    console.log('Started listening at PORT: 3001');
})