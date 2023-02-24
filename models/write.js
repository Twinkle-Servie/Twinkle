// 작성한 편지 저장, 서버에 새로 들어오는 편지들 저장 (배열)

const express = require('express');
const ejs = require("ejs");
const app = express();
const bodyParser = require('body-parser'); // npm install body-parser

let letters = Array();

letters.push("힘들어요1");
letters.push("힘들어요2");
letters.push("힘들어요3");
letters.push("힘들어요4");

app.set('view engine', 'ejs');
app.set('views', './view');

app.use(express.static('public'));

// json post 를 사용하려면 추가
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/letters', function(req, res) {
    res.render('letters', {
            letters: letters
    })
});

// 답장 서버에 저장 관련
app.post('/memoadd', function(req,res) {
	//req.body.msg // 답장인데.. 어디 저장하지
	res.json({result: 'ok'});
});

// 페이지를 찾을 수 없음 오류 처리
app.use(function(req, res, next) {
    res.status(404);	
    res.send(
		'<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">' +
		'<html><head><title>404 페이지 오류</title></head>' + 
		'<body><h1>찾을 수 없습니다</h1>' + 
		'<p>요청하신 URL ' + req.url + ' 을 이 서버에서 찾을 수 없습니다..</p><hr>' +
		'</body></html>'
	);
});

app.listen(8080, function(){});
