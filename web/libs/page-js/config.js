
//配置requirejs
;require.config({
	urlArgs:new Date(),//时间戳解决浏览器缓存问题
	//baseUrl:'',
	paths:{ 
		jquery:'../jquery/jquery-3.1.1',
		common:'../common/common',
<<<<<<< HEAD
		com:'common'
=======
		distpicker:'../jQueryDistpicker/src/distpicker',
		data:'../jQueryDistpicker/src/distpicker.data',
>>>>>>> 488b7ae8332ad7570a96d6301b0d9b0a4a010d37
	}, 
	shim:{ //
		common:['jquery'],
		distpicker:['jquery'],
		
	}
});
