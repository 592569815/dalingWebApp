/*公共js*/
//baseurl
var global = global || {};


global.baseurl = 'http://10.3.134.176:1234/';



//动态设置viewport的scale
var iScale = 1;
iScale = iScale / window.devicePixelRatio;
document.write('<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=' + iScale + ',minimum-scale=' + iScale + ',maximum-scale=' + iScale + '">')
//动态计算html的font-size
var iWidth = document.documentElement.clientWidth;
document.getElementsByTagName('html')[0].style.fontSize = iWidth / 10 + 'px';        
//1rem=75px

//封装一个返回函数
//parent:父元素			必选
//x 	:定位left值		必选
//y 	:定位top值		必选
//type 	:类型			可选
function goback(parent,left,top,type){
	 var a = $('<div/>').addClass('fanhui').append($('<div/>'));
	 var b = $('<div/>').addClass('fhbox').append(a).appendTo(parent)
	 .css({position:'fixed',left:'0.0'+ left + 'rem',top:'0.0'+ top + 'rem'});
	b.on('click',function(){
		if(type){
			location.href = './'+type+'.html';
		}else{
			history.back();
		}
	})
}
//使用案例 	goback(b,7,8)

//封装加载动画
function load(has){
	var res;
	if(has == 'yao'){
		res = 'rgba(0,0,0,0.3)';
	}else{
		res = 'rgba(0,0,0,0)';
	}


	var div = $('<div/>').addClass('load');

	var img = $("<img/>").attr({src:'./libs/img/loading1.gif'})
	.css({display:'inline-block',width:'0.4rem'})
	.appendTo(div);


	div.css({
		position:'fixed',background:res,
		width:'100%',
		height:'100%',
		top:0,

		fontSize:0,
		textAlign:'center',
		paddingTop:(innerHeight- img.outerHeight())/2,

	});

	div.appendTo($('body'));

}

//移除加载动画
function removeload(){
	$('.load').remove();
}

//浏览历史
function uhistory(text){
	//商品浏览历史 获取/设置容器
	var userhistory =  localStorage.userhistory;

	if(userhistory){

		userhistory = JSON.parse(userhistory);

	}else{
		userhistory = [];
	}


	//判读是否存在相同历史
	var has = 0;
	userhistory.forEach(function(item,idx){
		if(item.user == text){
			has=1;
		}
	});

	//历史不存在，内容不为空，写入更新
	if(has==0 && text!=''){
		userhistory.push({user:text});
		localStorage.userhistory = JSON.stringify(userhistory);
	}

}


