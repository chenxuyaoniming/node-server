const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const index = require('./src/index')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))


app.use('/',index);

app.listen(3000,(err)=>{
    if(!err){
        console.log('running')
    }
})
