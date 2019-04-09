const router = require('express').Router();

const axios = require('axios');

const baseUrl = 'http://api.dagoogle.cn/news';
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
    
    axios.get(`${baseUrl}/nlist?${str}`).then(data=>{
        data = data.data.data.list;
        if(data){
            res.status(200).send(data);
        }else{
            res.status(404).send(0)
        }
    })
})

//文章详情页

router.get(`/detail`,(req,res,next)=>{
    let { id } = req.query ;

    axios.get(`${baseUrl}/ndetail?aid=${id}`).then(data=>{
        if(data && data.status === 200){
            res.status(200).send(data.data)
        }else{
            res.status(500).send(0);
        }
    })

})

module.exports = router