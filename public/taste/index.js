// 轮播图
var swiper = new Swiper('.swiper-container', {
	spaceBetween: 30,
	centeredSlides: true,
	loop: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	}
});
//隐藏导航栏
$('.page-scroll').scroll(function(){
	console.log($(this).scrollTop());
	if($(this).scrollTop() > 80){
		$('.hide-header').stop().show();
	}else{
		$('.hide-header').stop().hide();
	}
});
//返回上一页
$('.icon-back').on('click',function(){
	history.back();
});