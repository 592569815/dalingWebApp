require(['config'],()=>{
	require(['jquery','com'],($)=>{
		$('.register').on('click',function(){
			var _number = $('#number').val();
			var _password = $('#password').val();
			console.log(_number,_password)
			$.post(global.baseurl+'login',{username:_number,password:_password},function(res){
				//显示遮罩层
				$('.loginMes').html(res.message);
				$('.success').stop(true).fadeIn().delay(2000).fadeOut();
				if(res.message == '登录成功！'){
					location.href='personal.html';
				}
			});
		})
		//当聚焦在input的输入框，登录按钮变亮
		$('#number').on('focus',function(){
			$('.register').css({background:'#d847ff'});
			$('.phoneNumber label').css({color:'black'})
		})
		.on('blur',function(){
			$('.register').css({background:'#c0c1c2'});
			$('.phoneNumber label').css({color:'#c0c1c2'})
		});
		$('#password').on('focus',function(){
			$('.register').css({background:'#d847ff'});
			$('.password label').css({color:'black'})
		})
		.on('blur',function(){
			$('.register').css({background:'#c0c1c2'});
			$('.password label').css({color:'#c0c1c2'})
		});
		$('.logg')[0].addEventListener('touchstart',function(event) {
			$('.logg').css({color:'#d847ff'})
		});
		$('.log')[0].addEventListener('touchstart',function(event) {
			$('.log').css({color:'#d847ff'})
			/*$.post("http://10.3.134.237:1234/login",{username:_number},function(res){
				alert(res);
				
			});*/
		});
		$('.log')[0].addEventListener('touchend',function(event) {
			$('.log').css({color:'#979597'})
		})
		$('.wechat')[0].addEventListener('touchstart',function(event) {
			$('.wechat').css({color:'#d847ff'})
		});
		$('.wechat')[0].addEventListener('touchend',function(event) {
			$('.wechat').css({color:'#979597'})
		});
		//短信验证登录
		$('.node')[0].addEventListener('touchstart',function(event) {
			$('.node').css({color:'#d847ff'})
			//生成随机数
			var res = parseInt((Math.random().toFixed(2))*10000);
			alert('手机验证码为' +res);
			//用cookie传送
			var _auth = [];
			var item = {
				auth:res
			};
			_auth.push(item)
			console.log(_auth)
			setCookie('_auth',JSON.stringify(_auth));
			location.href = 'phoneLogin.html';
		});
		$('.node')[0].addEventListener('touchend',function(event) {
			$('.node').css({color:'#979597'})
		});
		
		
	})
})