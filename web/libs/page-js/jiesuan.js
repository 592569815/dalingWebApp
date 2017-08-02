require(['config'],()=>{
	require(['jquery','distpicker','data'],($)=>{
		
		//先获取localStorage
		var goodsdatas = localStorage.goodsdatas;
		if(goodsdatas){
			goodsdatas = JSON.parse(goodsdatas)
			console.log(goodsdatas);
		}else{
			goodsdatas = [];
		}
		var res = goodsdatas.map(function(i){
			return`
				<div class="zhuMessage" >
					<a href="xiangqing.html?id+${i.id}"><img class="img" src="./libs/img/${i.imgsrc}" data-id="${i.id}"/></a>
					<div class="message">
						<p>${i.desc}</p>
						<div class="substract">
							<p class="qty">${i.qty}</p>
							<p class="price">${i.price}</p>
						</div>
					</div>
				</div>
			`
		})
		$('.move').html(res);

		/*//点击图片跳转详情页
		$(document).on('touchend','.img',function(){
			var currentId = $(this).data('id');
			window.location.href = 'xiangqing.html?id=' + currentId;
		});*/

		/*封装计算价格,数量*/
		function total(){
			var totalPrice = 0;
			var num = 0;
			goodsdatas.forEach(function(item){
				totalPrice += item.price * item.qty;
				num += item.qty;
			});

			for(var i = 0 ; i < $('.lect').length ; i++){
				if(!$($('.lect')[i]).hasClass('fondo')){
				var g_price = $($('.lect')[i]).parents('.Item_information').find('.price').text();//价格
				var g_num = $($('.lect')[i]).parents('.Item_information').find('.num').text();//数量
				totalPrice -= g_price*g_num;
				}
				$('.money').text(Number(totalPrice.toFixed(1)));
				$('.g_total').text(Number(totalPrice.toFixed(1)));
			}
			activity(totalPrice);
		}

		/*封装活动*/
		function activity(totalPrice){
			//如果购物满399，立减100元
			if($('.g_total').text() >= 399){
			$('.money').text(Number(totalPrice-100).toFixed(1));
			$('.g_total').text(Number(totalPrice.toFixed(1)) + ' 满399，立减100')
			}else{
				$('.money').text(Number(totalPrice.toFixed(1)));
				$('.g_total').text(Number(totalPrice.toFixed(1)));
			}
		}
		/*价格*/
		$('.g_total').text(total());

		/*单选效果*/
		$('.lect').on('touchend',function(){
			$('.lect').removeClass('fondo');
			$(this).addClass('fondo');
		});

		/*结算*/
		$('.payment').on('touchend',function(){

			if($('.username').val() == ''){
				$('.errtip').text('收货人姓名不能为空').fadeIn().delay(1000).fadeOut();
				return false;
			}
			if($('.phone').val() == ''){
				$('.errtip').text('手机号码不能为空').fadeIn().delay(1000).fadeOut();
				return false;
			}
			if($('.site').val() == ''){
				$('.errtip').text('详细地址不能为空').fadeIn().delay(1000).fadeOut();
				return false;
			}
			var user = [];
			var indent = {
				username:$('.username').val(),
				phone:$('.phone').val(),
				sheng:$('select')[0].value,
				shi:$('select')[1].value,
				qu:$('select')[2].value,
				site:$('.site').val(),
			}
			user.push(indent);
			localStorage.user = JSON.stringify(user);

			if($('.lect').hasClass('fondo')){
				window.location.href = 'personal.html';
			}else{
				$('.errtip').text('请选择支付方式').fadeIn().delay(1000).fadeOut();
			}
			
		})

	})
})