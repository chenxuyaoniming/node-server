const express = require('express');

const app = express();

const http = require('http');

const axios = require('axios');

const bodyParser = require('body-parser')

const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
router.all('*',(req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept,            X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

   next()
})

router.post('/',(req,res,next)=>{
    console.log(req.url)
    console.log(req.body,req.params)
    res.status(200).send('world')

})
router.get('/',(req,res,next)=>{
    let str = "";
    for(var t in req.query){
        str += t + '=' +req.query[t] + '&'
    }
    str = str.substr(0,str.length-1)
    console.log(str)
    axios.get(`http://api.dagoogle.cn/news/nlist?${str}`).then(data=>{
        data = data.data.data.list;
        res.status(200).send(data);
    })
        
    
})

app.use('/',router);

app.listen(3000,(err)=>{
    if(!err){
        console.log('running')
    }
})
