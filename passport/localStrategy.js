//로컬로그인 경로 그리기 
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt =require('bcrypt');

const User = require('../models/user');

module.exports=()=>{
    passport.user(new localStrategy({
        usernameField:'id',
        passwordField:'password', 
    }, async (id, password, done)=>{
        try{
            const exUser = await User.findOne({where : {email}});
            if(exUser){
                const result = await bcrypt.compare(password, exUser.password);
                if(result){
                    done(NULL, exUser);

                } else {
                    done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
                }


            }

        }catch(error){
            console.error(error);
            done(error);

        }
    }));
};