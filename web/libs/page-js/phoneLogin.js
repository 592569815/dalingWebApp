require(['config'],()=>{
	require(['jquery','com'],($)=>{
		var _auth=getCookie('_auth');
		_auth = JSON.parse(_auth);
		var pas = _auth[0].auth;
		console.log(pas);
		$('.register').on('click',function(){
			var _number = $('#number').val();
			var _password = $('#password').val();
			if(_password == pas){
				$.post(global.baseurl+'login',{username:_number,password:_password},function(res){
					alert(res.message);
					if(res.message == '登录成功！'){
						location.href='personal.html';
					}
				});
			}
		})
		//当聚焦在input的输入框，登录按钮变亮
		$('#number').on('focus',function(){
			$('.register').css({background:'#d847ff'});
		})
		.on('blur',function(){
			$('.register').css({background:'#c0c1c2'});
		});
		$('#password').on('focus',function(){
			$('.register').css({background:'#d847ff'});
		})
		.on('blur',function(){
			$('.register').css({background:'#c0c1c2'});
		});
		$('.wechat')[0].addEventListener('touchstart',function(event) {
			$('.wechat').css({color:'#d847ff'})
		});
		$('.wechat')[0].addEventListener('touchend',function(event) {
			$('.wechat').css({color:'#979597'})
		});
		//短信验证登录
		$('.node')[0].addEventListener('touchstart',function(event) {
			$('.node').css({color:'#d847ff'})
			location.href = 'login.html';
		});
		$('.node')[0].addEventListener('touchend',function(event) {
			$('.node').css({color:'#979597'})
		});
		
		
	})
})