var express = require('express');
var url = require('url');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.redirect('/index.html');
  res.send('respond with a resource');
});

router.get('/chat', function(req, res, next) {
	var nickname = req.session.nickname;
	if(nickname){
		// 확장자가 없을 경우는 자동으로 chat.ejs를 찾는다.
		// app.js에 ejs확장자를 사용하고 있다고 세팅되어있기 때문
		res.render('chat', {title: '채팅창', nickname: nickname});
	}else{
		res.redirect('/');
	}
});

/* GET users listing. */
router.get('/login', function(req, res, next) {
	// true는 querystring도 같이 obj로 parsing해준다.
	var username = url.parse(req.url, true).query.username;
	// 입장 처리(300대는 redirect)
	req.session.nickname = username;
	res.redirect('/chat');
});

/* POST users listing. */
router.post('/logout', function(req, res, next) {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;