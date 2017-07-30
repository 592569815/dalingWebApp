require(['config'],()=>{
	require(['jquery'],($)=>{
		var title = $('.one').children();
		//点击切换页面
		for(var i = 0;i < title.length;i++){
			//隐藏除第一个以外的内容
			if(i>0){
				$('.bigBody').children().eq(i).css({display:'none'});
			}
			// 传递idx值（关键）:在循环过程中把i值存入dom节点
			title[i].idx = i;
			$(title[i]).on('touchend',function(){
				var idx = this.idx;
				//清除全部高亮
				$('.one').children().css({color:'#b1b1b1'});
				$('.bigBody').children().css({display:'none'});
				//当前高亮
				$(this).css({color:'#af5bbf'});
				$('.bigBody').children().eq(idx).css({display:'block'});
			})
		}
		//接收商品信息
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
		});
		$('.body .move').html(res);
		if($('.move').html() != ''){
			console.log(666);
			$('.body .background').css({display:'none'});
		}else{
			console.log(77);
			$('.body .background').css({display:'block'});
		}
	})
})