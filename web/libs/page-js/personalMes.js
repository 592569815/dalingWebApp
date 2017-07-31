require(['config'],()=>{
	require(['jquery'],($)=>{
		//跳到主页
		$('.button').on('touchend',function(){
			location.href = "index.html";
		})
		$('.extra').children().first().on('touchend',function(){
			$('.head_portrait').fadeIn();
		})
		$('.head_portrait').children().last().on('touchend',function(){
			$('.head_portrait').fadeOut();
		})
		/*$('.head_portrait').children().eq(1).on('touchend',function(){
			console.log(66);
			$(this).diyUpload({
				url:'server/fileupload.php',
				success:function( data ) {
					console.info( data );
				},
				error:function( err ) {
					console.info( err );	
				}
			});
		})*/
		$('.extra').children().eq(4).on('touchend',function(){
			location.href = 'site.html';
		})
	})
})