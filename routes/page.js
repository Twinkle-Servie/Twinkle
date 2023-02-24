//app.js에서기본라우터로 설정한 page.js 

const express= require('express');

const router = express.Router();

//모든 요청마다 실행해주기 
//얘 변수 다시 설정해주기 
router.use((req, res, next)=>{
    //res.localsㅡㄴ 변수를 모든 템플릿엔진에서 공통으로 사용한다. 즉 user은 전역 변수임
    res.locals.user = null;
    next();

});

// http://127.0.0.1:8001/profile 에 get요청이 왔을 때
router.get('/profile', (req, res)=>{
    res.render('profile', {title : '나의 정보'})
})

// http://127.0.0.1:8001/join 에 get요청이 왔을 때 

router.get('/join', (req, res)=>{
    res.render('join', {title:'회원가입'})
});

// http://127.0.0.1:8001/ 에 get요청이 왔을 때 
router.get('/', (req, res, next) => {
    const twits = [];
    res.render('main', {
        title: 'sns',
        twits,
    });
});

