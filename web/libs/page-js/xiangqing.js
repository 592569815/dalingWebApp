;require(['config'],function(){
	require(['jquery'],function($){
		
		alert(999)
		var guid = Number(location.search.slice(4));
		console.log(guid);

		// var goodsqty;
		// console.log(guid);
		$.ajax({
			url:global.baseurl+'getAccount',
			// http://10.3.134.237:1234/getAccount?id=9
			dataType:'json',
			data:{
				id:guid
			},
			success:function(res){
				var resres = res.data[0];
				console.log(resres);
				
					showHtml(resres);


				var $s5 = $('.s5');

			    // var qty = 0;

			    // var resStr = JSON.stringify(resres);


				// goodsqty = localStorage.getItem(resStr);
				// console.log(goodqty);
				var $goodsqty = $('.goodsqty');
				var goodsdatas = localStorage.goodsdatas;
				if(goodsdatas){
					goodsdatas = JSON.parse(goodsdatas)
				}else{
					goodsdatas = [];
				}
				//封装获取本地存储的商品数量
				function getNum(){
					var num = 0;
					goodsdatas.forEach(function(item){
						num += item.qty;
					});
					return num;
				}

				$goodsqty.html(getNum())

				$s5.on('touchend',function(){
					
					var currentId = resres.id;
					var str = goodsdatas.filter(function(item){
						return item.id = currentId;
					})
					console.log('str',str[0]);
					if(str.length>0){
						str[0].qty++;
						$goodsqty.html(getNum());
					}else{
						var item = {
							id:currentId,
							title:resres.title,
							imgsrc:resres.img,
							desc:resres.desc,
							price:resres.price,
							qty:1
						}
						$goodsqty.html(getNum());
						goodsdatas.push(item);
					}
					localStorage.goodsdatas = JSON.stringify(goodsdatas);
					console.log(localStorage.goodsdatas);

					// if(goodqty === undefined){
					// 	consolelog(0)
					// }else{
					// 	console.log(goodqty);

					// }
					// console.log(goodqty);
					// $goodsqty = $('.goodsqty');
					
					
				})

			}
		})

		
		//根据数据生成结构
		function showHtml(item){
			var html = `
				<div class="main_t">
					<div class="p1">
						<p class="title">
							${item.title} -${item.desc} 
						</p>
						<span class="zan"><img src="libs/img/aixin.png" />${item.comment} </span>
					</div>

					<div class="p2">
						<h3 class="price">${item.price}</h3>
						<h4 class="delprice">${item.type}限时售价 ￥${item.oldPrice}</h4>
					</div>
				</div>
				<div class="main_b">
					<p class="p1">
						<img src="libs/img/fan.png" />购买可获得14达令币
						
					</p>
					<p class="p2">
						<img src="libs/img/ershi.png" />24小时发货
						<img src="libs/img/bao.png" />一件包邮
						<img src="libs/img/jiantou.png" />不支持7天退换
					</p>
				</div>

			`
			var imghtml = `
				<img src="./libs/img/${item.img}" >
			`
			$('.xq_main').html(html);


			$('.bgimg').html(imghtml);
		}

		var body = document.body;
		

		var tab = document.querySelector('.tab');
		var title = tab.children[0].children;
		var content = tab.children[1].children;


		title[0].className = 'active';

		for(let i=0;i<title.length;i++){
			
			if(i>0){
				content[i].style.display = 'none';
			}

			title[i].onclick = function(){
				//闭包
				return (function(i){
					for(let i=0;i<title.length;i++){
						title[i].className = '';
						content[i].style.display = 'none';
					}
					title[i].className = 'active';
					content[i].style.display = 'block';
				})(i);
			}
		}
		
		//点击结算跳转
		$(".s6").on('touchend',function(){
			window.location.href = "jiesuan.html";
		})
		//跳转购物车
		$('.img').on('touchend',function(){
			window.location.href = 'shoppingCar.html';
		})
		

	})
})