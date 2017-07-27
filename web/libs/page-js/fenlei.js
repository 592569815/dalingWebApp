;require(['config'],function(){
	require(['jquery'],function($){
		$('<div/>').addClass('footer').load('footer.html',function(){
			// 加载完成后写入页面
			$(this).insertAfter('.fl_content');
			$('.tabs-classify').addClass('active');
		})

		//吸顶菜单
		window.onscroll = function(){
			var scrollTop = window.scrollY;
			if(scrollTop >= 120 ){
				$('.index-tab').addClass('fixed');
			}else{
				$('.index-tab').removeClass('fixed');
			}
		}
	})
})