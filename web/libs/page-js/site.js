require(['config'],()=>{
	require(['jquery'],($)=>{
		//跳到主页
		$('.button').on('touchend',function(){
			location.href = "index.html";
		})
		$('.total_price').on('touchend',function(){
			$('.head_portrait').fadeIn();
		})
		$('.head_portrait').children().last().on('touchend',function(){
			$('.head_portrait').fadeOut();
		})
		$('.compile').children().eq(1).on('touchend',function(){
			//获取site里面的值内容
			var message = $('.site').html();
			$('.site').html("<input type='text' class='xiugai'/>");
			$('.site input').val(message);
			$('.redact').children().eq(0).css({display:'none'});
			$('.redact').children().eq(1).css({display:'block'});
		})
		$('.redact').children().eq(1).on('touchend',function(){
			var val = $('.site input').val();
			console.log(val);
			console.log($('.xiugai'));
			$('.xiugai').remove();
			$('.site').html(val);
			console.log($('.redact').children().eq(0))
			$('.redact').children().eq(0).css({display:'block'});
		})
		$('.compile').on('touchend','.delect',function(){
			var index = $(this).parent('.administration').index();
			console.log(index);
			$('.administration').eq(index).remove();
		})
	})
})