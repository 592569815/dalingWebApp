
//配置requirejs
;require.config({
	urlArgs:new Date(),//时间戳解决浏览器缓存问题
	//baseUrl:'',
	paths:{ 
		jquery:'../jquery/jquery-3.1.1',
		common:'../common/common',
	}, 
	shim:{ //
		common:['jquery'],
	}
});
