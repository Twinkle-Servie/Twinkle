//로그인 상태확인하기 미들웨어 생성 

//로그인 된 상태를 확인하는 미들 웨어
exports.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){// req.isAuthenticated(): 로그인 중이면 true, 아니면 false
        next();// 다음 미들웨어로 넘겨줌
    } else {
        res.status(403).send('로그인 해주셈');
    }
};

exports.isNotLoggedIn=(req, res,next)=>{
    if(!req.isAuthenticated()){
        next();
    } else {
        const message = encodeURIComponent('로그인하는 중의 컴포넌트');
        res.redirect('/?error=${message}');// 에러 페이지로 바로 이동시킴
    }
};

//로그인이 되지 않은 상태를 확인하는 미들웨어 