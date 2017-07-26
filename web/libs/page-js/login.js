require(['config'],()=>{
	require(['jquery'],($)=>{
		$('.register').on('click',function(){
			var _number = $('#number').val();
			var _password = $('#password').val();
			console.log(_number,_password)
			$.post("http://10.3.134.237:1234/login",{username:_number,password:_password},function(res){
				alert(res.message);
				if(res.message == '登录成功！'){
					location.href='personal.html';
				}
			})
		})
	})
})