;require(['config'],function(){
	require(['jquery'],function($){

		jQuery(function($){

			$('<div/>').addClass('footer').load('footer.html',function(){
				// 加载完成后写入页面
				$(this).insertAfter('.fl_content');
			})
		})

	})
})