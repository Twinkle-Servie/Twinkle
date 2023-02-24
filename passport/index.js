const passport =require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

//카카오 로그인은 일단 시간이 되면 하자....지금 플젝급한거부터 끄고!

module.exports =()=>{
    
    //serializeUser : 사용자 정보 객체를 세션에 아이디로 저장한다.
    passport.serializeUser((user,done)=>{
        // serializeUser: 로그인 시 실행됨, req.session(세션) 객체에 어떤 데이터를 저장할지 정하는 메서드
        done(null, user.id, user.password); // done 첫 번째 인수: 에러 발생 시 사용, done 두 번째 인수: 저장하고 싶은 데이터를 넣음
    });
        passport.deserializeUser((id, done)=>{
            User.findOne({where:{id}}) //db에 id있는지확인하기
            .then(user => done(null, user))
            // req(요청).user에 저장 -> 앞으로 req.user을 통해 로그인한 사용자의 정보를 가져올 수 있음
            .catch(err => done(err));
        });

       
        local();

};