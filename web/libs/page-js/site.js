require(['config'],()=>{
	require(['jquery'],($)=>{
		//先获取localStorage
		var user = localStorage.user;
		if(user){
			user = JSON.parse(user)
			console.log(user);
		}else{
			user = [];
		}
		var res = user.map(function(i){
			return`
				<div class="administration">
					<div class="one">
						<span class="name">${i.username}</span>
						<span class="phone">${i.phone}</span>
					</div>
					<div class="site">${i.sheng}${i.shi}${i.qu}${i.site}</div>
					<div class="compile">
						<span class="delect">删除</span>
						<div class="redact">
							<span>编辑</span>
							<span>确定</span>
						</div>
					</div>
				</div>
			`
		})
		$('.body').html(res);
		//跳到主页
		$('.button').on('touchend',function(){
			location.href = "index.html";
		})
		//编辑按钮编辑
		$('.redact').children().eq(0).on('touchend',function(){
			//获取site里面的值内容
			var message = $('.site').html();
			$('.site').html("<input type='text' class='xiugai'/>");
			$('.site input').val(message);
			$('.redact').children().eq(0).css({display:'none'});
			$('.redact').children().eq(1).css({display:'block'});
		})
		//确定按钮
		$('.redact').children().eq(1).on('touchend',function(){
			var val = $('.site input').val();
			$('.site').html(val);
			$('.xiugai').remove();
			$('.redact').children().eq(0).css({display:'block'});
			$('.redact').children().eq(1).css({display:'none'});
		})
		//删除按钮删除信息
		$('.compile').on('touchend','.delect',function(){
			console.log($(this).parent().parent());
			$(this).parent().parent().remove();
		})
		
	})
})