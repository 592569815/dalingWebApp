/*公共js*/
//baseurl
var global = global || {};
global.baseurl = 'http://localhost:1234/';

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




