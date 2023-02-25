//모듈 불러옴
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');// require('./passport/index.js')와 같음
const webSocket = require('./socket'); //웹소켓 가져옴

dotenv.config(); // .env 파일을 쓸 수 있게 함
passportConfig(); //passport 사용할 수 있도록함 // 패스포트 설정, 한 번 실행해두면 ()에 있는 deserializeUser 계속 실행

//라우터 연결
const pageRouter = require('./router/page');
const postRouter = require('./router/post');
const userRouter = require('./router/user');

const {sequelize} = require('./models');
const passportConfig = require('./passport');
const { Socket } = require('socket.io');


const app = express();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});
//sequelize와 db를 연결하기 
sequelize.sync({force : false}).then(() => {
    console.log('데이터베이스 연결에 성공하셨다면 당근을 흔들어주세요');
})
.catch((err) =>{
    console.error(err);
});

app.use(morgan('dev'));// morgan 연결 후 localhost:3000에 다시 접속하면 기존 로그 외 추가적인 로그를 볼 수 있음

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
        httpOnly: true, // httpOnly: 클라이언트에서 쿠키를 확인하지 못하게 함
        secure: false, // secure: false는 https가 아닌 환경에서도 사용 가능 - 배포할 때는 true로 
    },
}));



// 라우터 연결
app.use('/', pageRouter);
app.use('/', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

// 라우터가 없을 때 실행 
app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.use(passport.initialize());// 요청(req 객체)에 passport 설정을 심음
app.use(passport.session());

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});

//웹 소켓 익스프레스에 연결시켰음
const server = app.listen(app.get('port'),()=>{console.log(app.get('port'), '번 포트에서 대기 중입니다.')});

webSocket(server);

