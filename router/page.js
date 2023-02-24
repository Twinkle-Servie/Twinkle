// app.js에서 기본 router로 설정한 page.js
const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares'); //middlewares의 두 미들웨어를 가져옴

const router = express.Router();

// 모든 요청마다 실행
router.use((req,res,next)=>{
    res.locals.user = null;  // res.locals는 변수를 모든 템플릿 엔진에서 공통으로 사용, 즉 user는 전역 변수로 이해하면 됨(아래도 동일)
    res.locals.posts = [];
    next();
});

// http://127.0.0.1:8001/profile 에 get요청이 왔을 때 
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보'});
});

// http://127.0.0.1:8001/join 에 get요청이 왔을 때 
router.get('/join', (req, res)=>{
    res.render('join', {title: '회원가입 '});
});



// http://127.0.0.1:8001/ 에 get요청이 왔을 때 
router.get('/', isLoggedIn, (req, res, next) => {
    const posts = [];
    res.render('main', {
        title: 'Twinkle',
        posts,
        
    });
});

module.exports = router;