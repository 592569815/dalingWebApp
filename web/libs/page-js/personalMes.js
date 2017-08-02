require(['config'],()=>{
	require(['jquery'],($)=>{
		$('.extra').children().first().on('touchend',function(){
			$('.head_portrait').fadeIn();
		})
		$('.head_portrait').children().last().on('touchend',function(){
			$('.head_portrait').fadeOut();
		})
		$('.head_portrait').children().first().on('touchend',function(){
			console.log(66);
			navigator.camera.getPicture(function (imageData) {
                    // document.getElementById('myImage').src = "data:image/jpeg;base64," + imageData;
                    console.log(imageData);
                    $('#myImage').attr('src', imageData);
                }, function (message) {
                    console.log('Failed because: ' + message);
                }, {
                    quality: 50,
                    destinationType: Camera.DestinationType.FILE_URI,
                    saveToPhotoAlbum: true
                });
            })
			/*$(this).diyUpload({
				url:'server/fileupload.php',
				success:function( data ) {
					console.info( data );
				},
				error:function( err ) {
					console.info( err );	
				}
			});*/
		})
		$('.btn-file').on('touchend',function(){
			/*$('form').children().eq(2).css({display:'block'});*/
		})
		$('.extra').children().eq(4).on('touchend',function(){
			location.href = 'site.html';
		})
	})
})