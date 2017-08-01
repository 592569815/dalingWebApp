require(['config'],()=>{
	require(['jquery'],($)=>{
		//加载页脚
		$('<div/>').addClass('foot').load('./footer.html',function(){
			
			$(this).appendTo('body');
			$('.tabs-car').addClass('active');

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

		//先获取localStorage
		var goodsdatas = localStorage.goodsdatas;
		if(goodsdatas){
			
			goodsdatas = JSON.parse(goodsdatas)
			console.log(goodsdatas);
		}else{
			goodsdatas = [];
		}

		function getNum(){
			var num = 0;
			goodsdatas.forEach(function(item){
				num += item.qty;
			});
			return num;
		}

		$('.cart-num').html(getNum());
		showempty();

		//显示隐藏空购物车
		function showempty(){
			if(goodsdatas.length == 0){
				$('.car-empty').css({display:'block'});
				$('.three').find('a').attr('disabled',true).css({'pointer-events':'none',background:'#858385'})
				$('.body').html('');
			}else{
				$('.car-empty').css({display:'none'});
				$('.three').find('a').attr('disabled',false);
			}
		}
		

		var res = goodsdatas.map(function(i){
			return`
			<div class="goods">
				<p>
					<span>无敌价</span>
					<span>满399减100</span>
				</p>
				<div class="Item_information" data-id="${i.id}">
					<div class="choose">
						<span class="fondo lect"></span>
						<a href="xiangqing.html?id=${i.id}"><img  class="img" src="./libs/img/${i.imgsrc}" data-id="${i.id}"/></a>
					</div>
					<div class="message">
						<p>${i.desc}</p>
						<p>300ml</p>
						<div class="substract">
							<p class="price">${i.price}</p>
							<div>
								<span class="_substract">-</span>
								<span class="num">${i.qty}</span>
								<span class="plus">+</span>
							</div>
						</div>
					</div>
				</div>
			</div>	
			`
		})
		$('.body').html(res);
		total();
		
		var $lect = $('.lect');
		//每个分类的总数
		
		//相减
		$(document).on('touchend','._substract',function(){
			var number = $(this).next().text(); //先获取数量

			if(number<=1){ //数量判断
				number=1;
			}else{
				number--;
			}
			$(this).next().text(number);  //写入数量
			var currentId = $(this).parents('.Item_information').data('id');
			local(currentId,number);
			total();
			$('.cart-num').html(getNum());
		})
		//相加
		$(document).on('touchend','.plus',function(){
			var number = $(this).prev().text();
			number++;
			$(this).prev().text(number);
			var currentId = $(this).parents('.Item_information').data('id');
			local(currentId,number);
			total();
			$('.cart-num').html(getNum());
		})

		/*封装重新写入*/
		function local(currentId,number,th){
			goodsdatas.forEach(function(item){
				if(item.id == currentId){
					item.qty = number;
					return false;
				}
			})
			localStorage.goodsdatas = JSON.stringify(goodsdatas);

		}

		//全选/不选
		$('.button').on('touchend',function(){
			$(this).toggleClass('fondo');
			if($(this).hasClass('fondo')){
				
				$('.lect').addClass('fondo');
			
			}else{
				
				$('.lect').removeClass('fondo');
				
			}
			
			total();
		});

		//单个
		$('.lect').on('touchend',function(){
			$(this).toggleClass('fondo');
			if(isAll()){
				$('.button').addClass('fondo');
			}else{
				$('.button').removeClass('fondo');
			}
			total();
		});

		//封装 判断是否全部勾选
		function isAll(){
			var res = true;//假设全部勾选
			for(var i = 0 ; i < $lect.length ; i++){
				if(!$($lect[i]).hasClass('fondo')){
					res = false;
					break;
				}
			}
			return res;
		}

		/*封装计算价格,数量*/
		function total(){
			var totalPrice = 0;
			goodsdatas.forEach(function(item){
				totalPrice += item.price * item.qty;
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

		//绑定window滚动事件
		$(window).on('scroll',function(){
			//滚动距离加上一个页面的高度
			var scrollTop=parseInt(window.scrollY)+1334;
			
			//获取body的高度
			var height = document.body.clientHeight;
			/*console.log(scrollTop,height);*/
			if(scrollTop>=height){
				// $('.footer').css({position:'static'});
			}else{
				$('.footer').css({position:'fixed'});
			}
			
			
		})

		//点击图片跳转详情页
		$(document).on('touchend','.img',function(){
			var currentId = $(this).data('id');
			window.location.href = 'xiangqing.html?id=' + currentId;
		})

		/*点击编辑*/
		$('.edit').on('touchend',function(){
			$('.edit').css({display:'none'});
			$('.complete').css({display:'block'});
			$('.maidan').css({display:'none'});
			$('.remove').css({display:'block'});
			$('.lect').removeClass('fondo');
			$('.button').removeClass('fondo');

		})

		/*点击完成*/
		$('.complete').on('touchend',function(){
			$('.edit').css({display:'block'});
			$('.complete').css({display:'none'});
			$('.maidan').css({display:'block'});
			$('.remove').css({display:'none'});
			$('.lect').addClass('fondo');
			$('.button').addClass('fondo');
			total();
			$('.cart-num').html(getNum());
		})
		//点击删除按钮
		$('.removeGood').on('touchend',function(){
			$('.currentRemove').css({display:'block'});
			
		})
		//点击取消按钮
		$('.cancel').on('touchend',function(){
			$('.currentRemove').css({display:'none'});
		})

		//点击确认按钮
		$('.verify').on('touchend',function(){
			for(var i = 0 ; i < $('.lect').length ; i++){
				if($($('.lect')[i]).hasClass('fondo')){
					console.log($($('.lect')[i]).hasClass('fondo'))
					var currentId = $($('.lect')[i]).parents('.Item_information').data('id');
					
					
					goodsdatas.forEach(function(item,idx){
						item.id = currentId;
						goodsdatas.splice(idx,1);
					})
					localStorage.goodsdatas = JSON.stringify(goodsdatas);
				}
			}
			$($('.lect.fondo')).parents('.goods').remove();
			showempty();
			total();
			$('.cart-num').html(getNum());
			$('.currentRemove').css({display:'none'});
		});

	});
});