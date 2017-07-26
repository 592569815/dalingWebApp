;require(['config'],function(){
	require(['jquery'],function($){
		

		var guid = location.search.slice(4);

		var goodqty;
		// console.log(guid);
		$.ajax({
			url:'http://10.3.134.237:1234/getAccount',
			// http://10.3.134.237:1234/getAccount?id=9
			dataType:'json',
			data:{
				id:guid
			},
			success:function(res){
				// console.log(res);
				var resres = res.data[0]
				
				
					showHtml(resres);


				$s5 = $('.s5');

			    var qty = 0;

			    var resStr = JSON.stringify(resres);
				goodqty = localStorage.getItem(resStr);
				// console.log(goodqty);
				$s5.on('click',function(){
					
					
					// console.log(resres.id);
					

					
					if(goodqty){
						goodqty++;
						qty = goodqty;

					}else{
						qty++;
					}
						localStorage.setItem(resStr,qty);

					
					
					

					// if(goodqty === undefined){
					// 	consolelog(0)
					// }else{
					// 	console.log(goodqty);

					// }
					// console.log(goodqty);
					$goodsqty = $('.goodsqty');
					$goodsqty.html(qty);
					
				})

			}
		})

		
		//根据数据生成结构
		function showHtml(item){
			var html = `
				<div class="main_t">
					<div class="p1">
						<p class="title">
							${item.type}-${item.title}
						</p>
						<span><img src="./libs/img/s4.png"/></span>
					</div>

					<div class="p2">
						<h3 class="price">￥${item.price}</h3>
						<h4 class="delprice">${item.type}限时售价 ￥59</h4>
					</div>
				</div>
				<div class="main_b">
					<img src="./libs/img/mainb.png" >
				</div>

			`
			var imghtml = `
				<img src="./libs/img/${item.img}" >
			`
			$('.xq_main').html(html);


			$('.bgimg').html(imghtml);
		}

		// var body = document.body;
		
		
		$('.ding').on('click',function(){
			window.scrollY = 0;
		})
		
		//点击结算跳转
		$(".s6").click(function(){
			location.href = "jiesuan.html";
		})
		

		

	})
})