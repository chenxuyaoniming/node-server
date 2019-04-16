const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const index = require('./src/index');
const music = require('./src/music')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))


app.use('/',index);

app.use('/song',music);

app.listen(3000,(err)=>{
    if(!err){
        console.log('running')
    }
})
