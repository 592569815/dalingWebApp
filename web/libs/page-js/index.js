;require(['config'],function(){
	require(['jquery','footer'],function($){

		//载入页尾
		$('<div/>').addClass('foot').load('./footer.html',function(){
			
			$(this).appendTo('body');
		});
		
		//导航栏
		var actnav = [
		{imgsrc:'1500633324525.jpg'},
		{imgsrc:'15006333653730.jpg'},
		{imgsrc:'15006333918446.jpg'},
		{imgsrc:'15006334145111.jpg'},
		{imgsrc:'15006334544469.jpg'}
		];
		var actnavHtml = actnav.map(function(item){
			return `
				<li>
					<a href="#">
						<div class="img" style="background-image:url(./libs/img/${item.imgsrc});height:100%"></div>
					</a>
				</li>
			`
		})
		$('.ul').html(actnavHtml);
		//广告
		var actimg = [
		{imgsrc:'15006270771124.jpg'},
		{imgsrc:'15006225992681.png'},
		{imgsrc:'15008644377884.jpg'},
		];
		var actimgHtml = actimg.map(function(item){
			return `
				<div class="act-content">
					<a href = "#"> 
						<div class="img" style="background-image:url(./libs/img/${item.imgsrc});height:100%"></div>
					</a>
				</div>
			`
		}).join('');
		$('.activity')[0].innerHTML += actimgHtml;

		//倒计时
		var now = new Date();
		var end = new Date('2017-07-26 23:59:59')
		var offset = Math.floor((end-now)/1000);  

		// 计算剩余的时、分
		var minLeft = Math.floor(offset/60)%60;
		var hourLeft = Math.floor(offset/60/60)%24;
		
		minLeft = minLeft<10 ? '0' + minLeft : minLeft;
		hourLeft = hourLeft<10 ? '0' + hourLeft : hourLeft;
		var time = '还剩'+hourLeft+'小时'+minLeft+'分';
		$('.time').text(time);
		
		//扩展菜单
		$('.tab-none').on('touchstart',function(){
			$('.index-tab').addClass('show');
			$('.tab-none').css({display:'none'});
			return false;
		})
		$('body').on('touchstart',function(e){
			if(e.target != $('.tabs')[0]){
				$('.index-tab').removeClass('show');
				$('.tab-none').css({display:'block'});
			}
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

		
		//请求数据
	$.post('http://10.3.134.237:1234/getProducts',{page:1,qty:15},function(res){
		console.log(res);
		var goodsHtml = res.data.map(function(item,idx){
			return `
				<div class="goods-one">
					<div class="goodsbox">
						<div class="goods">
							<a class="block">
								<div class="goods-img" style="background-image:url(./libs/img/${item.img})" data-url="${item.img}"></div>
								<div class="goods-title">${item.title}</div>
								<div class="goods-desc">${item.desc}</div>
								<div class="price">${item.price}</div>
							</a>
							<div class="joincar" data-id="${item.id}">
								<div class="car-desc">
									<p class="car-num">1655人</p>
									<p>加入购物车</p>
								</div>
								<div class="icon-car">
									<span class="car"></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			`
		}).join('');
		$('.goods-list')[0].innerHTML += goodsHtml;
	})
	//先获取localStorage
	var goodsdatas = localStorage.goodsdatas;
	if(goodsdatas){
		goodsdatas = JSON.parse(goodsdatas)
	}else{
		goodsdatas = [];
	}
	
	//加入购物车，传数据给购物车
	$(document).on('touchstart','.joincar',function(){	
		$('.success').stop(true).fadeIn().delay(2000).fadeOut();
		//数据传输
		var currentId = $(this).data('id')
		var res = goodsdatas.filter(function(item){
			return item.id === currentId;
		})	
		if(res.length>0){
			res[0].qty++;
		}else{
			var item = {
				id:currentId,
				title:$(this).parent().find('.goods-title').text(),
				imgsrc:$(this).parent().find('.goods-img').data('url'),
				desc:$(this).parent().find('.goods-desc').text(),
				price:$(this).parent().find('.price').text(),
				qty:1
			}
			goodsdatas.push(item);
		}
		localStorage.goodsdatas = JSON.stringify(goodsdatas);
	})
	
	//传给详情页的Id
		$(document).on('touchstart','.goods-img',function(){	
		//数据传输
			var currentId = $(this).parent().next().data('id');
			console.log(currentId)
			location.href = "xiangqing.html?id=" + currentId;
		})
	});
});