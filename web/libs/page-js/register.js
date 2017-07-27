require(['config'],()=>{
	require(['jquery'],($)=>{
		var number;
		$('#gain').on('click',function(){
			//生成一个随机四位数
			 number = parseInt(((Math.random()).toFixed(2))*10000);
			 alert('你的验证码是' + number);
		})
		$('.register').on('click',function(){
			
			console.log(666);
			//表单验证
			//手机号 11位  1[34578]
			var _number=$('#number').val();
			if(!/^1[34578]\d{9}$/.test(_number)){
				alert('你家的手机号码是这样?');
				return false;
			}
			//密码 长度6-20 不能包含空格
			var _password=$('#sureAuth').val();
			if(!/^[^\s]{6,20}$/.test(_password)){
				alert('密码太low了');
				return false;
			}
			//验证码要跟number相符合
			/*var _auth=$('#auth').val();
			var _number=string(number);
			alert(_auth,_number);*/
			/*if(_auth !== _number){
				alert('验证码错了，傻狍子');
				return false;
			}
			console.log(_auth,_number)*/
			
				$.post(global.baseurl+'register',{username:_number,password:_password},
					function(res){
						console.log(res.message)
						if(res.message!= '注册成功!'){
							alert('用户已存在,请直接登录')
							location.href='login.html';
						}else{
							alert('注册成功，快去登录')
							location.href='login.html';
						}
					}
				)
			/*location.href=''*/
		})
		
	})
})
