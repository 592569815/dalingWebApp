require(['config'],()=>{
	require(['jquery','com'],($)=>{
		
		$('#gain').on('click',function(){
			//生成一个随机四位数
			var number = parseInt(((Math.random()).toFixed(2))*10000);
			 $('#gain').html(number);
		})
		
		$('#number').on('focus',function(){
			$('.register').css({background:'#d847ff'});
			$('.phoneNumber label').css({color:'black'});
			
		})
		$('#number').on('blur',function(){
			//表单验证
			//手机号 11位  1[34578]
			var _number=$('#number').val();
			$('.phoneNumber label').css({color:'#c0c1c2'});
			$('.register').css({background:'#c0c1c2'});
			if(!/^1[34578]\d{9}$/.test(_number)){
				$('.hint').html('*你家的手机号码是这样?');
				return false;
			}else{
				$('.hint').html('');
			}
			
		})
		
		$('#sureAuth').on('focus',function(){
			$('.password label').css({color:'black'});
		})
		$('#sureAuth').on('blur',function(){
			//密码 长度6-20 不能包含空格
			var _password=$('#sureAuth').val();
			$('.password label').css({color:'#c0c1c2'});
			if(!/^[^\s]{6,20}$/.test(_password)){
				$('._hint').html('*密码太low了');
				return false;
			}else{
				$('._hint').html('');
			}
		})
		
		$('#auth').on('focus',function(){
			$('.auth_code label').css({color:'black'});
			
		})
		$('#auth').on('blur',function(){
			$('.auth_code label').css({color:'#c0c1c2'});
			//验证码要跟number相符合
			var _auth = $('#auth').val();
			var _number = $('#gain').html();
			if(_auth != _number){
				$('._hin').html('*验证码错了，傻狍子');
				return false;
			}else{
				$('._hin').html('');
			}
		})
			
		$('.register').on('touchstart',function(){
			var _number=$('#number').val();
			var _password=$('#sureAuth').val();
			$.post(global.baseurl+'register',{username:_number,password:_password},
				function(res){
					console.log(res)
					if(!res.status){
						//显示遮罩层
						$('.loginMes').html('用户已存在,请直接登录');
						$('.success').stop(true).fadeIn().delay(2000).fadeOut();
					}else{
						$('.loginMes').html('注册成功！');
						$('.success').stop(true).fadeIn().delay(2000).fadeOut();
	
						location.href='login.html';
					}
				}
			)
		})
		
	})
})