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
//获取音乐排行榜
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
//获取歌曲信息
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

//获取音乐歌单

router.get('/personList',(req,response,next)=>{

    axios.get('http://m.kugou.com/plist/index&json=true').then(res=>{
        if(res.status === 200){
            response.status(200).send(res.data)
        }else{
            response.status(404).send('error:-1')
        }
    }).catch(err=>{

        response.status(500).send('error:-2')
    })
})

//歌单下的歌曲列表
router.get('/songList',(req,response,next)=>{
    let {id} = req.query;
    axios.get(`http://m.kugou.com/plist/list/${id}?json=true`).then(res=>{
        if(res.status === 200){
            response.status(200).send(res.data) 
        }else{
            response.status(404).send('error:-1')
        }
    }).catch(err=>{
        response.status(500).send('error:-2')
    })
})
//音乐搜索列表


router.get('/searchList',(req,response,next)=>{
    let { sid ,page = 1,pagesize = 20,showtype = 1} = req.query;
    console.log(sid,page,pagesize)
    axios.get(`http://mobilecdn.kugou.com/api/v3/search/song`,{
        params:{
            keyword:sid,
            page:page,
            pagesize:pagesize,
            showtype:showtype,
            format:'json'
        }
    }).then(res=>{
        response.status(200).send(res.data)
    }).catch(err=>{
        response.status(500).send('error:-2')
    })

})


module.exports = router;

