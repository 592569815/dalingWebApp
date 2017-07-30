require(['config'],function(){
	require(['jquery'],function($){
		//载入页尾
		$('<div/>').addClass('footbg').load('./footer.html',function(){
			
			$(this).appendTo('body');

			$('.footer-tabs').on('touchend','a',function(){
				if($(this).)
			})
			$('.tabs-home').addClass('active');

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


			
			
	});
});
