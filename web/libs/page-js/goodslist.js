jQuery(function($){

	//请求发送数据；
	$.post(global.baseurl + "getProducts",function(res){
		console.log(res)

		//创建ul;
		var $ul = $("<ul/>").addClass("g_goods");
		res.data.map(function(item){
			$("<li/>").attr("data-id",item.id).html(`
				<div class="g_goodsImg"><img data-src = "${item.img}" src="./libs/img/${item.img}" /></div>
				<div class="g_goodsTitle">${item.title}</div>
				<div class="g_goodsDesc">${item.desc}</div>
				<div class="g_goodsPrice">
					<span class="g_price">￥&nbsp;&nbsp;${item.price}</span>
					<span class="g_addCar"></span>
				</div>
			`).appendTo($ul);
		});
		$ul.appendTo($(".g_goodslist"));
	});


	$(".g_goodslist").on("click","img",function(){
		console.log(9999)
	})

	//点击商品跳转详情页
	$(".g_goodslist").on("click","img",function(){
		var id = $(this).parents("li").data("id");
		console.log(9999999,id)
		location.href = "xiangqing.html?id=" + id;
	});

	//加入购物车，传数据给购物车
	//先获取localStorage
	var goodsdatas = localStorage.goodsdatas;
	if(goodsdatas){
		goodsdatas = JSON.parse(goodsdatas)
	}else{
		goodsdatas = [];
	}
	$(document).on('click','.g_addCar',function(){	
		console.log($(this).parents("li").find('.g_goodsImg img').data('src'))
		$('.success').stop(true).fadeIn().delay(2000).fadeOut();
		//数据传输
		var currentId = $(this).parents("li").data('id');
		var res = goodsdatas.filter(function(item){
			return item.id === currentId;
		})	
		if(res.length>0){
			res[0].qty++;
		}else{
			var item = {
				id:currentId,
				title:$(this).parents("li").find('.g_goodsTitle').text(),
				imgsrc:$(this).parents("li").find('.g_goodsImg img').data('src'),
				desc:$(this).parents("li").find('.g_goodsDesc').text(),
				price:$(this).parents("li").find('.g_goodsPrice').text(),
				qty:1
			}
			goodsdatas.push(item);
		}
		localStorage.goodsdatas = JSON.stringify(goodsdatas);
	});
	console.log(9999,goodsdatas)

	//跳转购物车
	$(".car_fixed").click(function(){
		location.href = "shoppingCar.html";
	})
	

	//点击搜索；
	$(".search").click(function(){
		$(this).hide().siblings(".get_goods").show();
		//显示热门搜索
		$(".g_hot").show();
		//隐藏商品列表
		$(".g_goodslist").hide();
		//输入框获得焦点；
		$(".search_goods").focus();
		//隐藏导航；
		$(".g_nav").hide();
	});

	//搜索商品；
	var timer;
	$(".search_goods").on("input",function(){
		//清除定时器；
		clearTimeout(timer);

		var _value = $(this).val();
		console.log(_value);

		timer = setTimeout(function(){

			$.post("http://localhost:1234/queryProducts",{keyWord:_value},function(res){
				console.log("模糊查询",res)
			})
		},500)

	})

	//点击取消搜索；
	$(".cancle").click(function(){
		$(this).parents(".get_goods").hide();
		$(".search").show();
		$(".g_hot").hide();
		$(".g_goodslist").show();
		//隐藏导航；
		$(".g_nav").show();
	});

	// 点击导航切换；
	$(".g_nav").on("click","li",function(e){
		$(this).children("a").addClass("g_active");
		$(this).siblings("li").children("a").removeClass("g_active");

		//进行价格高低排序；
		if($(this).hasClass("g_price")){
			$.post();
		};

		$(".g_goods_sort").hide();
		//隐藏商品列表；
		$(".g_goodslist").show();
			
		//隐藏搜索；
		$(".head").show();

		if($(this).hasClass("g_sort")){
			$(".g_goods_sort").show();

			//隐藏商品列表；
			$(".g_goodslist").hide();
			
			//隐藏搜索；
			$(".head").hide();
		}

		e.preventDefault();
	});

	//点击返回顶部；
	$(".back_top").click(function(){
		$("body").animate({scrollTop:0});
	})

	// 滚动更多，懒加载；
	var pageNum = 0;
	$(window).on('scroll',function(){
		var scrollTop = parseInt($(window).scrollTop());
		var winHeight = parseInt($(window).height());
		var scrollHeight = parseInt($('html').outerHeight());

		//搜索框高度；
		var search_height = $(".head").height();

		//吸顶菜单；
		if(scrollTop >= 120){
			$(".g_nav").addClass("g_fixed");
		}else{
			$(".g_nav").removeClass("g_fixed");
		};

		//返回顶部；
		if(scrollTop >400){
			$(".back_top").show();
		}else{
			$(".back_top").hide();

		}

		// 如何判断滚动到最底部
		if(scrollTop >= scrollHeight - winHeight - 400){
			console.log(9999999);
			$(".holdon").show();
			pageNum++;
			var lazy = lazyLoad({page:pageNum});

		}

		//懒加载函数；
		function lazyLoad(data){
			$.post(global.baseurl + "getProducts",data,function(res){
				//返回的数组为空时，提示加载完毕；
				console.log(res.data.length)
				if(res.data.length <= 0){
					$(".holdon").html("没有更多商品了哦！");
				}
				$(".holdon").hide();

				res.data.map(function(item){
					$("<li/>").html(`
						<div class="g_goodsImg"><img data-src = "${item.img}" src="./libs/img/${item.img}" /></div>
						<div class="g_goodsTitle">${item.title}</div>
						<div class="g_goodsDesc">${item.desc}</div>
						<div class="g_goodsPrice">
							<span class="g_price">￥&nbsp;&nbsp;${item.price}</span>
							<span class="g_addCar"></span>
						</div>
					`).appendTo($(".g_goods"));
					return true;
				});
			})
		}
	});
})
