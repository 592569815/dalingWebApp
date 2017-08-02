require(['config'],()=>{
	require(['jquery'],($)=>{
		//载入页尾
		$('<div/>').addClass('footbg').load('./footer.html',function(){
			
			$(this).appendTo('body');
			$('.tabs-home').addClass('active')
			
			//先获取localStorage
			var goodsdatas = localStorage.goodsdatas;
			if(goodsdatas){
			
				goodsdatas = JSON.parse(goodsdatas)
				console.log(goodsdatas);
			}else{
				goodsdatas = [];
			}

			//封装获取本地存储的商品数量
			function getNum(){
				var num = 0;
				goodsdatas.forEach(function(item){
					num += item.qty;
				});
				return num;
			}
			$('.cart-num').html(getNum());
		});
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