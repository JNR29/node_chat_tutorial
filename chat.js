function chat(io){
	console.log('websocket server start');
	io.on('connection', function(s){
		console.log('클라이언트 접속', s.client.conn.remoteAddress);
		s.on('disconnect', function(){
			console.log('클라이언트 접속 종료', s.client.conn.remoteAddress);
			io.emit('chat', '시스템: ' + s.nickname + ' 님이 퇴장했습니다.');
		});
		// 만든 이벤트
		s.on('login', function(nickname){
			s.nickname = nickname;
			// 클라이언트에 메세지 전송(io는 연결된 모든 소켓에게 보낸다.)
			io.emit('chat', '시스템: ' + nickname + ' 님이 입장했습니다.');
			// 현재 자신의 소켓에만 보내므로 본인만 메세지를 받는다.
			// s.emit('chat', '시스템: ' + nickname + ' 님이 입장했습니다.');
		});
		s.on('chat', function(msg){
			if(msg.trim() === ''){
				s.emit('chat', '시스템: 메세지를 입력하세요.');
			}else{
				io.emit('chat', s.nickname + ': ' + msg);
			}
		});
	});
}

module.exports = chat;