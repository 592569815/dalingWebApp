
var global = global || {};

global.baseurl = 'http://localhost:1703/';


<<<<<<< HEAD
=======

>>>>>>> aee73aed40bd2fa1ab9b53de046237de457a88b8
//动态设置viewport的scale
var iScale = 1;
iScale = iScale / window.devicePixelRatio;
document.write('<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=' + iScale + ',minimum-scale=' + iScale + ',maximum-scale=' + iScale + '">')
//动态计算html的font-size
var iWidth = document.documentElement.clientWidth;
document.getElementsByTagName('html')[0].style.fontSize = iWidth / 10+ 'px';        
//1rem=75px

