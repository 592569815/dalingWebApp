require(['config'],function(){
	require(['jquery'],function($){
		$("#g_search").load("./public_search.html");

		//请求发送数据；global.baseurl + "getProducts",
		$.post(global.baseurl + "getProducts",function(res){

			console.log(res)
			createGoods(res)

		});

		//生成商品函数；
		function createGoods(res){
			$(".g_goodslist").html("");
			//创建ul;
			var $ul = $("<ul/>").addClass("g_goods");
			res.data.map(function(item){
				var price = item.price;
				if(item.sales / 10000 >= 1){
					var sales = (item.sales/10000).toFixed(1) + "万";
				}else if(!item.sales){
					var sales = 0;
				}else{
					var sales = item.sales;
				};

				$("<li/>").attr("data-id",item.id).html(`
					<div class="g_goodsImg"><a href="xiangqing.html?id=${item.id}"><img data-src = "${item.img}" src="./libs/img/${item.img}" /></a></div>
					<div class="g_goodsTitle">${item.title}</div>
					<div class="g_goodsDesc">${item.desc}</div>
					<div class="g_goodsPrice">
						<span class="g_price">${price}</span>
						<span class="g_addCar"></span>
					</div>
					<div class="g_sales">已卖出&nbsp;<span>${sales}</span>&nbsp;件</div>
				`).appendTo($ul);
			});
			$ul.appendTo($(".g_goodslist"));
		}


		// $(".g_goodslist").on("click","img",function(){
		// 	console.log(9999)
		// })

		//点击商品跳转详情页
		// $(".g_goodslist").on("click","img",function(){
		// 	var id = $(this).parents("li").data("id");
		// 	console.log(9999999,id)
		// 	location.href = "xiangqing.html?id=" + id;
		// });

		//加入购物车,传数据给购物车
		//先获取localStorage
		var goodsdatas = localStorage.goodsdatas;
		if(goodsdatas){
			goodsdatas = JSON.parse(goodsdatas)
		}else{
			goodsdatas = [];
		}
		$(document).on('touchend','.g_addCar',function(){	
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
		$(".car_fixed")[0].addEventListener("touchend",function(e){
			$(".open_menu").show();
			e.stopPropagation();
		});
		$("body")[0].addEventListener("touchend",function(){
			$(".open_menu").hide();

		})
		
		//代码延迟操作；
		$(document).ready(function(){
			//点击搜索；
			$(".search")[0].addEventListener("touchend",function(){console.log(99999999)
				$(this).hide().siblings(".get_goods").show();
				//显示热门搜索
				$(".g_hot_t").show();
				//隐藏商品列表
				$(".g_goodslist").hide();
				//隐藏悬浮菜单；
				$(".fixed_menu").hide();
				//输入框获得焦点；
				$(".search_goods").focus();
				//隐藏导航；
				$(".g_nav").hide();
			});

			//搜索商品；
			var timer;
			$(".search_goods").on("input propertychange",function(){
				//清除定时器；
				clearTimeout(timer);

				var _value = $(this).val();
				console.log(_value);
				search_goods(_value);

			});

			//模糊搜索商品函数；
			function search_goods(_value){
				timer = setTimeout(function(){

					$.post(global.baseurl + "queryProducts",{name:"desc",keyWord:_value},function(res){
						console.log(res)

						//热门搜索隐藏；
						$(".g_hot_t").hide();

						$(".g_hot_s").show();


						//找到数据时；
						if(res.status){

							//搜索按钮出现；
							$(".g_search").show();

							//取消按钮隐藏；
							$(".cancle").hide();
							$(".no_goods").hide();
							$(".g_hot").show();

							var html = res.data.map(function(item){
								return `
									<div data-id = "${item.id}">
										<a href = "xiangqing.html?id=${item.id}"<img src="./libs/img/${item.img}" alt="" /></a>
										<p>
											<span class="g_title">${item.title}</span>
											<span>${item.desc}</span>
										</p>
									</div>
								`
							});

							$(".g_hot_s").html(html);

							//调用生成商品函数 ；
							createGoods(res);

						}else{
							//没有数据时；
							// $(".g_hot_s").html("");
							$(".no_goods").show().html("没有找到相应的商品！");
						}

						//点击搜索，找到全部符合条件的商品
						$(".g_search")[0].addEventListener("touchend",function(){

							$(this).hide();
							//隐藏搜索页面；
							
							$(".g_hot").hide();

							//显示商品列表
							$(".g_goodslist").show();
							$(".search").show();
							//显示取消按钮
							$(".cancle").show();
							
							//显示导航；
							$(".g_nav").show();

							//显示悬浮菜单；
							$(".fixed_menu").show();

						})
					})
				},500)

			}

			//点击搜索到的商品跳转到商品详情页；
			$(".g_hot_s").on("touchend","div",function(){
				var id = $(this).data("id");
				location.href = "xiangqing.html?id=" + id;
			});


			//点击取消搜索；
			$(".cancle")[0].addEventListener("touchend",function(){
				$(this).parents(".get_goods").hide();
				$(".search").show();
				//显示悬浮菜单；
				$(".fixed_menu").show();

				$(".g_hot_t").hide();
				$(".g_goodslist").show();
				//隐藏导航；
				$(".g_nav").show();
			});

			//热门搜索；
			var hot_arr = ["方便面","曲奇","酥脆花生米","威化饼干","咖啡","拉面","芦荟茶","面包干","超辣","韩国","饮料","奶油","中粮集团"];
			hot_arr.map(function(item){
				$("<span/>").html(item).appendTo($(".g_hot_goods"));
			});

			//点击热门搜索；
			$(".g_hot_goods").on("touchend","span",function(){
				var _value = $(this).text();
				search_goods(_value);
			})
		});


		// 点击导航切换；
		$(".g_nav").on("touchend","li",function(e){
			$(this).children("a").addClass("g_active");
			$(this).siblings("li").children("a").removeClass("g_active");

			$(".g_goods_sort").hide();
			//隐藏商品列表；
			$(".g_goodslist").show();

			//点击其他时，取消价格高亮排序；
			if(!$(this).hasClass("g_price")){
				//取消价格排序高亮
				$(".priceUp").removeClass("_priceUp");
				$(".priceDown").removeClass("_priceDown");
			}
			//点击其他时，取消价格高亮排序；
			if(!$(this).hasClass("g_sales_accounts")){
				//取消价格排序高亮
				$(".salesUp").removeClass("_salesUp");
				$(".salesDown").removeClass("_salesDown");
			}
				
			//隐藏搜索；
			$(".head").show();

			if($(this).hasClass("g_sort")){
				console.log(8888)
				$(".g_goods_sort").show();

				//隐藏商品列表；
				$(".g_goodslist").hide();
				
				//隐藏搜索；
				$(".head").hide();
			}

			e.preventDefault();
		});

		//综合显示商品；
		$(".comp")[0].addEventListener("touchend",function(){
			

			//请求发送数据；
			$.post(global.baseurl + "getProducts",function(res){
				console.log(res);
				//调用生成商品函数 
				createGoods(res);
			});
		})

		//进行销量高低排序；
		$(".g_sales_accounts")[0].addEventListener("touchend",function(){
			var num;

			if($(".salesUp").hasClass("_salesUp")){
				$(".salesUp").removeClass("_salesUp");
				$(".salesDown").addClass("_salesDown");
				num = -1;
			}else{
				$(".salesUp").addClass("_salesUp");
				$(".salesDown").removeClass("_salesDown");
				num = 1;
			};
			console.log(num);

			$.post(global.baseurl + "sortPrice",{options:"sales",status:num},function(res){
				console.log(res);
				//调用生成商品函数 
				createGoods(res);
				
			});
		});

		//显示新品；
		$(".g_newGoods")[0].addEventListener("touchend",function(){
			$.post(global.baseurl + "sortPrice",{options:"date",status:-1},function(res){
				console.log(res);
				//调用生成商品函数 
				createGoods(res);
				
			});
		})

		//进行价格高低排序；
		$(".g_sortPrice")[0].addEventListener("touchend",function(){
			var num;

			if($(".priceUp").hasClass("_priceUp")){
				$(".priceUp").removeClass("_priceUp");
				$(".priceDown").addClass("_priceDown");
				num = -1;
			}else{
				$(".priceUp").addClass("_priceUp");
				$(".priceDown").removeClass("_priceDown");
				num = 1;
			};
			console.log(num);

			$.post(global.baseurl + "sortPrice",{options:"price",status:num},function(res){
				console.log(res);
				//调用生成商品函数 
				createGoods(res);
				
			});
		});



		//点击返回顶部；
		$(".back_top")[0].addEventListener("touchend",function(){
			$("body").animate({scrollTop:0});
		})

		// 滚动更多,懒加载；
		var pageNum = 1;
		var num = 1;
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
				num++;
				console.log(9999999);
				$(".holdon").show();
				if(num == pageNum + 1){
					pageNum++;
					var lazy = lazyLoad({page:pageNum});
				}

			};

			//懒加载函数；
			function lazyLoad(data){
				//显示加载动画；
				$(".g_loading").show();

				//判断是否存在价格排序；
				if($(".priceUp").hasClass("_priceUp")){
					//价格升序；
					data["status"] = 1;
					data["options"] = price;
					// {options:"price",status:num}
					console.log(data)
					$.post(global.baseurl + "sortPrice",data,function(res){
						addGoods(res);
					});
				}else if($(".priceDown").hasClass("_priceDown")){
					//价格降序；
					data["status"] = -1;
					data["options"] = price;

					console.log(data)

					$.post(global.baseurl + "sortPrice",data,function(res){
						addGoods(res);
					});
				}else if($(".g_sales_accounts").hasClass("_salesUp")){
					//销量升序；
					data["status"] = 1;
					data["options"] = sales;
					// {options:"price",status:num}
					console.log(data)
					$.post(global.baseurl + "sortPrice",data,function(res){
						addGoods(res);
					});
				}else if($(".g_sales_accounts").hasClass("_salesDown")){
					//销量降序；
					data["status"] = -1;
					data["options"] = sales;

					console.log(data)

					$.post(global.baseurl + "sortPrice",data,function(res){
						addGoods(res);
					});
				}else{

					$.post(global.baseurl + "getProducts",data,function(res){
						addGoods(res);

					});
				};
				//返回的数组为空时，提示加载完毕；
				//console.log(res.data.length)

				//商品懒加载追加商品函数；
				function addGoods(res){

					//隐藏加载动画；
					setTimeout(function(){

						$(".g_loading").hide();
					},500)

					if(!res.data){
						console.log(666666)
						return false;
						$(".holdon").html("没有更多商品了哦！");
					}
					$(".holdon").hide();

					res.data.map(function(item){
						var price = item.price.toFixed(1);
						if(item.sales / 10000 >= 1){
							var sales = (item.sales/10000).toFixed(1) + "万";
						}else{
							var sales = item.sales;
						}
						$("<li/>").html(`
							<div class="g_goodsImg"><a href="xiangqing.html?id=${item.id}"><img data-src = "${item.img}" src="./libs/img/${item.img}" /></a></div>
							<div class="g_goodsTitle">${item.title}</div>
							<div class="g_goodsDesc">${item.desc}</div>
							<div class="g_goodsPrice">
								<span class="g_price">${price}</span>
								<span class="g_addCar"></span>
							</div>
							<div class="g_sales">已卖出&nbsp;${sales}&nbsp;件</div>

						`).appendTo($(".g_goods"));
						return true;
					});
				}
			}
		});

		//列表导航；
		var nav_arr = [
			[{"全部分类":["无敌价","海外直邮","美女专场","“鹿”小物","极致美护","创意生活","情趣诱惑","全球性零食","极速保税区","时尚配饰","表白礼物"]}
			],
			[
				{"地域":["Top榜","全部","日系","韩系","欧美","港台","东南亚"]},
				{"面部护肤":["面膜","洁面","化妆水","精华","眼部护理","面霜/乳液","唇部护理","防晒","精油","护肤套装"]},
				{"彩妆香氛":["卸妆","隔离/底妆","唇膏口红","眼妆/腮红","美甲","女士香水"]}
			],
			[
				{"饼干":["Top榜","全部","饼干","糕点","曲奇","威化"]},
				{"水果":["苹果","车厘子","榴莲","龙眼","香蕉"]},
				{"咖啡/冲饮":["咖啡","养生柚子茶","麦片","冲饮粉奶茶","蜂蜜","茶/花果茶"]},
				{"休闲零食":["果冻/布丁","薯片玉米片","肉干/肉松","海味即食","膨化零食","蜜饯"]},
				{"饮料/酒水":["果汁饮料","乳饮料","碳酸饮料","酒"]},
				{"坚果":["果干","坚果"]}
			],
			[
				{"风格馆":["Top榜","韩系风格","简约欧美","运动休闲","文艺复古","高街潮牌","套装","荷叶边","露肩","牛仔","条纹"]},
				{"上装":["全部","长袖T恤","棒球外套","夹克","短外套","马甲","皮草","棉服","皮衣","毛衣","条纹","长袖T恤","棒球外套","夹克","短外套","马甲","皮草","棉服","皮衣","毛衣","条纹"]},
				{"裙装":["连衣裙","半身裙","印花裙","背带裙","长裙","百褶裙","牛仔裙","直筒裙","蕾丝裙","雪纺裙"]},
				{"下装":["牛仔裤","休闲裤","打底裤","哈伦裤","高腰裤","阔腿裤","背带裤","短裤","连体裤","西装裤","皮裤"]}
			],
			[
				{"创意礼物":["Top榜","玩偶","随身小物件","钥匙挂件","其他创意礼品"]},
				{"品质生活":["情趣诱惑","伞/雨具","衣物清洁","家居服","居室清洁","宠物用品","户外用品","蜡烛/香薰","卫浴清洁","收纳用品","防臭/芳香","驱蚊/防蚊","健身器材","纸品","汽车用品"]},
				{"个人护理":["口腔护理","头发护理","身体护理","私密护理","电动剃须刀","吹风机","美容器","按摩器","美发器","个护其它"]},
				{"3C产品":["手机","电脑","IPAD","耳机","电视","数码相机","机器人","智能监控","行车记录仪"]}
			],
			[
				{"时尚配饰":["Top榜","全部","奢侈品","配饰","箱包"]},
				{"饰品":["项链","手链","耳饰","戒指","太阳镜","发饰","腕表","“鹿”小物","脚链","毛衣链","其它饰品","镜架"]},
				{"包袋":["双肩包","单肩包","手提包","钱包","拉杆箱","功能包","零钱包"]},
				{"服饰配件":["丝巾","帽子","手套","贴身衣物","腰带","其它服配","围巾"]}
			],
			[
				{"品牌":["资生堂","Clinie","Bioderma","兰芝","美都汇","七格格","百依恋歌","昆蒂娜","全南","HAVVA","IKEWA","锦仕","宝氏","IDEALITIC","INVOTIS","Incidence","IMIXID","JBL","Jolly Bags","KAiLA","Koziol","Longchamp","Lulu Guinness","Lollipops","INVOTIS","Incidence","IMIXID","JBL","Jolly Bags","KAiLA","Koziol","Longchamp","Lulu Guinness","Lollipops"]}
			]

		];
		nav_arr.forEach(function(item,idx){
			var $div = $("<div/>").css({"display":"none"});
			if(idx == 0){
				$div.css({"display":"block"});
			}
			item.forEach(function(item2){
				for(var attr in item2){
					// console.log(item2[attr]);
					$("<h2/>").html(attr).appendTo($div);
					$ul = $("<ul/>");
					item2[attr].forEach(function(item3){
						$("<li/>").html(`<a href="goodslist.html">${item3}</a>`).appendTo($ul);
					});
					$ul.appendTo($div);
				}
			});
			$div.appendTo($(".g_sub_nav"));
		});

		//点击切换导航；
		$(".g_nav2").on("touchend","li",function(){
			console.log(8888)
			var idx = $(this).index();
			$(this).addClass("active_bg").siblings("li").removeClass("active_bg");
			$(".g_sub_nav").children().eq(idx).show().siblings().hide();
		});
		// $(".g_sub_nav").on("click","li",function(){
		// 	location.href = "goodslist.html";
		// })

		

	});
});
