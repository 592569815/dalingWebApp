require(['config'],()=>{
	require(['jquery'],($)=>{
		//点击头像跳到登录页面
		$('.portrait').on('touchstart',function(){
			location.href = 'login.html';
		});
		//个人信息修改
		$('.head b').on('touchstart',function(){
			location.href = 'personalMes.html';
		})
		//跳到购物车
		$('.icon-gouwuche').on('touchend',function(){
			location.href = 'shoppingCar.html';
		})
		//跳到订单
		$('.ding').on('touchend',function(){
			location.href = 'dingdan.html';
		})
	})
})