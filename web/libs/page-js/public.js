// require(['config'],function(){
// 	require(['jquery'],function($){
		//代码延迟操作；
		$(document).ready(function(){
			//点击搜索；
			$(".search").click(function(){console.log(99999999)
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
			$(".search_goods").bind("input propertychange",function(){
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
										<img src="./libs/img/${item.img}" alt="" />
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
						$(".g_search").click(function(){

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
			$(".g_hot_s").on("click","div",function(){
				var id = $(this).data("id");
				location.href = "xiangqing.html?id=" + id;
			});


			//点击取消搜索；
			$(".cancle").click(function(){
				$(this).parents(".get_goods").hide();
				$(".search").show();
				//显示悬浮菜单；
				$(".fixed_menu").show();

				$(".g_hot_t").hide();
				$(".g_goodslist").show();
				//隐藏导航；
				$(".g_nav").show();
			});
		});

		
// 	});
// });