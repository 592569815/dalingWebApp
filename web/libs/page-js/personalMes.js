require(['config'],()=>{
	require(['jquery'],($)=>{
		//跳到主页
		$('.button').on('touchend',function(){
			location.href = "index.html";
		})
		$('.extra').children().first().on('touchend',function(){
			$('.head_portrait').fadeIn();
		})
		$('.head_portrait').children().last().on('touchend',function(){
			$('.head_portrait').fadeOut();
		})
		
		$('.extra').children().eq(4).on('touchend',function(){
			location.href = 'site.html';
		})
	})
})