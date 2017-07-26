require(['config'],()=>{
	require(['jquery'],($)=>{
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
				<p>
					<span>无敌价</span>
					<span>价格无敌，手慢无</span>
				</p>
				<div class="Item_information">
					<div class="choose">
						<span class="fondo lect"></span>
						<img src="./libs/img/goods/${i.imgsrc}"/>
					</div>
					<div class="message">
						<p>${i.desc}</p>
						<p>300ml</p>
						<div class="substract">
							<p>￥${i.price}</p>
							<div>
								<span id="_substract">-</span>
								<span id="num">${i.qty}</span>
								<span id="plus">+</span>
							</div>
						</div>
					</div>
				</div>
			`
		})
		$('.body').html(res);
		var price = $('.substract p').html();
		$('#money').html(price);
		//获取数据
		var goodlist; 
		//相加相减
		var qty = $('.substract p').html().slice(1);
		//每个分类的总数
		var total;
		//总数
		var _qty;
		//获取value值
		var number = $('#num').html();
		$('#_substract').on('click',function(){
			if(number<=0){
				number=0;
			}else{
				number--;
			}
			$('#num').html(number);
			_qty = qty*number;
			$('.total').children().last().html('¥'+_qty+'.00');
		})
		$('#plus').on('click',function(){
			number++;
			$('#num').html(number);
			_qty = qty*number;
			$('.total').children().last().html('¥'+_qty+'.00');
		})
		//不全选
		$('.lect').on('click',function(){
			$(this).toggleClass('fondo');
			$('.button').toggleClass('fondo');
		})
		$('.button').on('click',function(){
			$(this).toggleClass('fondo');
			$('.lect').toggleClass('fondo');
		})
		//绑定window滚动事件
		$(window).on('scroll',function(){
			//滚动距离加上一个页面的高度
			var scrollTop=parseInt(window.scrollY)+1334;
			
			//获取body的高度
			var height = document.body.clientHeight;
			/*console.log(scrollTop,height);*/
			if(scrollTop>=height){
				$('.footer').css({position:'static'});
			}else{
				$('.footer').css({position:'fixed'});
			}
			
			
		})
		
	})
})