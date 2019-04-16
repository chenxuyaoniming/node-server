const router = require('express').Router();

const axios = require('axios');

router.all('*',(req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept,            X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

   next()
});


router.get('/newSong',(req,response,next)=>{

    let data = req.query;

    axios.get('http://m.kugou.com/?json=true').then((res)=>{
        if(res.status==200){
            response.status(200).send(res.data)
        }
    }).catch(err=>{
        response.status(500).send(0)
    })
});

router.get('/newSongRank',(req,response,next)=>{

    axios.get('http://m.kugou.com/rank/list&json=true').then(res=>{
        if(res.status===200){
            response.status(200).send(res.data)
        }else{
            response.status(401).send('数据获取不正常')
        }
    }).catch(err=>{
        if(err){
            response.status(404).send(`请求失败，错误信息：${err}`)
        }
    })

});

router.get('/songDetail',(req,response,next)=>{
    let { hash } = req.query;
    axios.get(`http://www.kugou.com/yy/index.php?r=play/getdata&hash=${hash}`).then(res=>{
        if(res.status === 200){
            response.status(200).send(res.data)
        }else{
            response.status(400).send('歌曲丢了～')
        }
    })
})






module.exports = router;

