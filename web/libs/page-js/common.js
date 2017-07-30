/**
 * [随机生成一个rgb颜色]
 * @return {String} [返回一个颜色：rgb(255,205,205)]
 */
function randomColor(){
	var r = parseInt(Math.random()*256);
	var g = parseInt(Math.random()*256);
	var b = parseInt(Math.random()*256);

	// 拼接css样式
	var rgb = 'rgb('+r+','+g+','+b+')';


	// 函数返回值
	// return

	return rgb;
}


// 在此处封装一个获取特定范围内随机数的方法
function randomNum(min,max){
	// Math.random()*(35-10)+10
	return parseInt(Math.random()*(max-min+1)) + min;
}
// randomNum(10,35);=> 15,17


// 获取子元素
// 过滤文本节点
function getElementChild(nodes){
	var res = [];

	// 遍历节点，保留元素节点
	for(var i=0;i<nodes.length;i++){
		if(nodes[i].nodeType === 1){
			res.push(nodes[i]);
		}
	}

	return res;

}
//getElementChild(lis);//[li,li,li]

// 获取前一个兄弟元素
function getPreviousElement(node){
	var ele = node.previousSibling;

	// 是文本节点并且不是第一个节点
	while(ele.nodeType === 3 && ele != ele.parentNode.firstChild){
		ele = ele.previousSibling;
	}
	
	return ele;
}

// 获取后一个兄弟元素
function getNextElement(node){
	var ele = node.nextSibling;

	// 是文本节点并且不是最后一个节点
	while(ele.nodeType === 3 && ele != ele.parentNode.lastChild){
		ele = ele.nextSibling;
	}
	
	return ele;
}

/**
 * [获取CSS样式，兼容ie8以下的浏览器]
 * @param  {Node} ele  [要获取样式的元素]
 * @param  {String} attr [css属性]
 * @return {String}      [css属性值]
 */
function getCss(ele,attr){
	var res = '';

	// 浏览器是否支持这个属性/方法

	// 标准浏览器
	if(window.getComputedStyle){
		res = getComputedStyle(ele)[attr]
	}

	// ie8-
	else if(ele.currentStyle){//
		res = ele.currentStyle[attr]
	}

	// 如果都不支持，则返回内联样式
	else{
		res = ele.style[attr];
	}

	return res;
}
//getCss(ele,'fontSize');//=>12px

/**
 * [给元素绑定事件的方法，兼容ie8-]
 * @param {Element} ele     [要绑定事件的元素]
 * @param {String} type    [事件类型]
 * @param {Function} handler [事件处理函数]
 * @param {Boolean} capture [是否捕获]
 */
function addEvent(ele,type,handler,capture){

	// 标准浏览器
	if(ele.addEventListener){
		ele.addEventListener(type,handler,capture);
	}

	// IE8-
	else if(ele.attachEvent){
		ele.attachEvent('on' + type,handler);
	}

	// 其他
	else{
		ele['on' + type] = handler;
	}
}
// addEvent(ele,'click',function(){},true);


/**
 * [设置cookie函数]
 * @param {String} name    [cookie名]
 * @param {String} val     [cookie值]
 * @param {[Date]} expires [有效期]
 * @param {[String]} path    [路径]
 */
function setCookie(name,val,expires,path){
	// cookie名/值（必填）
	var str_cookie = name + '=' + val;

	// cookie有效期
	if(expires){
		str_cookie += ';expires=' + expires.toUTCString();
	}

	// cookie路径
	if(path){
		str_cookie += ';path=' + path;
	}

	document.cookie = str_cookie;
}
// setCookie('username','laoxie',now,'/');//
// setCookie('username','laoxie');

/**
 * [获取cookie]
 * @param  {String} name [cookie名]
 * @return {String}      [返回值]
 */
function getCookie(name){
	// 获取所有cookie并拆分成数组
	var cookies = document.cookie;
	var arr_cookie = cookies.split('; ');

	// 存放cookie值
	var res = '';

	// 遍历数组，找到所需的cookie，并返回
	for(var i=0;i<arr_cookie.length;i++){
		var arr = arr_cookie[i].split('=');
		if(arr[0] === name){
			res = arr[1];
		}
	}

	return res;
}
//getCookie('username');//'laoxie' || ''

/**
 * [删除cookie的方法]
 * @param  {String} name [cookie名]
 */
function deleteCookie(name){
	// 利用设置有效期来达到删除cookie的效果
	var now = new Date();
	now.setDate(now.getDate()-1);
	document.cookie = name + '=0;expires=' + now.toUTCString();
}
// deleteCookie(name)

/**
 * [动画函数]
 * @param  {Element}   ele      [执行动画的元素]
 * @param  {String}   attr     [动画属性]
 * @param  {Number}   target   [目标值]
 * @param  {[Function]} callback [回调函数]
 */
/*function animate(ele,attr,target,callback){
	var timerName = attr + 'timer';
	// 添加定时器前先清除
	clearInterval(ele[timerName]);

	ele[timerName] = setInterval(function(){
		// 获取当前值
		// var current = getComputedStyle(ele)[attr];
		var current = getCss(ele,attr);

		// 提取单位
		// 100px,100rem,100em,0.5,20deg
		var unit = current.match(/[a-z]+$/i);
		unit = unit? unit[0] : '';

		// 提取当前值（数值）
		current = parseFloat(current);

		// 计算速度
		var speed = (target - current)/10;

		if(attr === 'opacity'){
			// 匀速运动
			speed = speed>0 ? 0.1 : -0.1;
		}else{
			// 缓冲运动
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
		}



		// 动画完成
		if(current === target || speed === 0){
			clearInterval(ele[timerName]);
			current = target - speed;

			// 执行回掉函数
			// 如何判断一个变量是否为函数
			if(typeof callback === 'function'){
				callback();
			}
		}

		ele.style[attr] = current + speed + unit;
	},30);
}*/

// animate(pic,'left',-810);

/**
 * [动画函数]
 * @param  {Element}   ele      [执行动画的元素]
 * @param  {Object}   opt      [动画属性]
 * @param  {Function} callback [回调函数,动画完成后执行]
 */
function animate(ele,opt,callback){
	//opt => {left:200,width:600}

	// 记录属性数量
	var attrLen = 0;
	
	// 遍历对象
	for(var attr in opt){
		attrLen++;
		createTimer(attr);
	}

	function createTimer(attr){
		var timerName = attr + 'timer';

		// 目标值
		var target = opt[attr];

		// 添加定时器前先清除
		clearInterval(ele[timerName]);

		ele[timerName] = setInterval(function(){
			// 获取当前值
			// var current = getComputedStyle(ele)[attr];
			var current = getCss(ele,attr);

			// 提取单位
			// 100px,100rem,100em,0.5,20deg
			var unit = current.match(/[a-z]+$/i);
			unit = unit? unit[0] : '';

			// 提取当前值（数值）
			current = parseFloat(current);

			// 计算速度
			var speed = (target - current)/10;

			if(attr === 'opacity'){
				// 匀速运动
				speed = speed>0 ? 0.1 : -0.1;
			}else{
				// 缓冲运动
				speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
			}

			// 动画完成
			if(current === target || speed === 0){
				clearInterval(ele[timerName]);
				current = target - speed;

				attrLen--;

				// 执行回掉函数
				// 如何判断一个变量是否为函数
				if(typeof callback === 'function' && attrLen===0){
					callback();
				}
			}

			ele.style[attr] = current + speed + unit;
		},30);
	}
}

// animate(ele,{left:200,width:600},function(){});

/*
	* 传参
	* 返回数据是否为json字符串
 */
function ajax(options){

	// 默认参数
	var defaults = {
		type:'get',
		async:true
	}

	var opt = Object.assign({},defaults,options);

	// 参数处理
	// opt.data=>{}
	// params = 'page=1&title=xxx'
	var params = '';
	if(opt.data){
		for(var attr in opt.data){
			params += attr + '=' + opt.data[attr] + '&';
		}

		// 去除多余的&
		params = params.slice(0,-1);
	}

	// jsonp请求
	if(opt.dataType === 'jsonp'){
		// 1.预设全局函数
		window.getData = function(res){
			if(typeof opt.success === 'function'){
				opt.success(res);
			}

			document.body.removeChild(script);
		}

		// 2.创建script标签，并写入页面
		var script = document.createElement('script');
		script.src = opt.url + '?' + params + '&callback=getData';
		document.body.appendChild(script);

		// jsonp请求结束，终止代码向下执行
		return;
	}

	// 异步请求对象兼容性处理
	var xhr = null;
	try{
		// 标准浏览器的用法
		xhr = new XMLHttpRequest();
	}catch(error){
		// ie低版本浏览有多种异步请求的实现
		try{
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(err){
			try{
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){
				alert('你的浏览器太low了，这个世界不适合你');
			}
		}
	}

	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && (xhr.status == 200 || xhr.status == 304)){
			var res;
			// if(/^[\{\]]/.test(res)){
			// 	res = JSON.parse(res);
			// }

			try{
				res = JSON.parse(xhr.responseText);
			}catch(e){
				res = xhr.responseText;
			}


			if(typeof opt.success === 'function'){
				opt.success(res);
			}
		}
	}

	

	var api = opt.url;
	if(opt.type == 'get'){
		api += '?' + params;
		params = null;
	}

	xhr.open(opt.type,api,opt.async);

	// 如果为post，则添加content-type请求头
	if(opt.type === 'post'){
		xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
	}

	xhr.send(params);
}
// ajax({
// 	url:'http://wthrcdn.etouch.cn/weather_mini',
// 	data:{city:'广州'},
// 	success:function(res){
// 		// JSON.parse(res)
// 		// 处理数据
// 		res.data.forecast.map(item=>{

// 		});
// 	}
// })

/**
 * [判断数据类型]
 * @param  {任意类型} data [数据]
 * @return {String}        [返回数据类型]
 */
function type(data){
	var res = Object.prototype.toString.call(data);//[object Array]
	res = res.slice(8,-1).toLowerCase();
	return res;
}

// type([10,20]);//array
// type('abc');//string
// type(function(){});//function