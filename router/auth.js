const express =require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User =require('../models/user');

const router = express.Router();

//회원가입 라우터, /auth/join
router.post('/join', isNotLoggedIn, async(req, res, next) =>{
    try{
        const exUser = await User.findOne({where:{email}});
        if(exUser) {
            return res.redirect('/join?error=exist'); //주소 뒤에 에러를 쿼리스트링으로 표시한다. 
        }
        //User이 존재하지 않으면 회원가입이 가능하다. 
        const hash = await bcrypt.hash(password, 12);

        await User.create({
            id,
            nickname,
            password : hash,
        });
        return res.redirect('/');
    }catch(error) {
        console.error(error);
        return next(error);
    }
});

//로그인 라우터 만들기 
router.post('/login', isNotLoggedIn, (req, res, next) =>{
    passport.authenticate('local', (authError, user, info) =>{

        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user) {
            return res.redirect('/?loginError=${info.message');
        }

        return req.login(user, (loginError)=>{
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

//로그아웃 라우터 만들기 
router.post('/login', isNotLoggedIn, (req, res, next) =>{
    passport.authenticate('local', (authError, user, info)=>{
        if(authError){
            console.error(auth)
        }
    })
})