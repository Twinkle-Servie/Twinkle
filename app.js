//전체적인 설정(사용 관련)

const express= require('express');
//서버에 필요한 기능인 미들웨어
const cookieParser = require('cookie-parser');  // 요청된 쿠키를 쉽게 추출할 수 있도록 함
const morgan = require('morgan');
const path = require('path');   //파일과 폴더 경로 작업기능 모듈 불러오기 
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
//

dotenv.config(); 
//.env 파일을 쓸 수 있도록 하는 함수 

//기본 router로 page.js 설정해주기 
const pageRouter = require('./routes/page');

const app = express();  //미들웨어를 어플리케이션에 추가함 
app.set('port', process.env.PORT || 8001);  //process.env라른 객체에 port라는 설정이 있다면 그 속성을 사용하고 없다면 3000을 사용한다는 뜻이다.
app.set('view engin', 'html');
nunjucks.configure('views', {
    express : app,
    watch : true,
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET)); // .env 파일의 COOKIE_SECRET 변수 사용 - 보안 UP

//express-session
app.use(session({
    resave:false, // resave : 요청이 올 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지 설정
    saveUninitialized: false,  // saveUninitialized : 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
         // httpOnly: 클라이언트에서 쿠키를 확인하지 못하게 함
        secure: false, // secure: false는 https가 아닌 환경에서도 사용 가능 - 배포할 때는 true로 
    },
}));

app.use('/', pageRouter);

//라우터가 없을 때 에러코드 띄우기
app.use((req, res, next)=>{
    const error = new Error('${req.method} ${req.url} 라우터가 없습니다.');
    error.status = 404;
    next(error);

});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port') , '번 포트에서 대기하고 있음')
});




