require(['config'],()=>{
	require(['jquery'],($)=>{
		//绑定window滚动事件
		$(window).on('scroll',function(){
			//滚动距离加上一个页面的高度
			var scrollTop=window.scrollY+1334;
			//获取body的高度
			var height = document.body.clientHeight;
			
			if(scrollTop>=height){

				$('.footer').css({position:'static'});
			}else{
				$('.footer').css({position:'fixed'});
			}
		})
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
				<div class="zhuMessage">
					<img src="./libs/img/${i.imgsrc}"/>
					<div class="message">
						<p>${i.desc}</p>
						<p>300ml</p>
						<div class="substract">
							<span>无敌价</span>
							<p>${i.price}</p>
						</div>
					</div>
				</div>
			`
		})
		$('.move').html(res);
	})
})