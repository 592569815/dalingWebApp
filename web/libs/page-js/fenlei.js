;require(['config'],function(){
	require(['jquery','load'],function($){
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