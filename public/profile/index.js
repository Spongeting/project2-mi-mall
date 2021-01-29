
//根据是否登录来改变个人中心的样式
console.log(sessionStorage.getItem("name"));
if(sessionStorage.getItem("name") !== null){
	$('.please-log a').text(sessionStorage.getItem("name"));
	$('.header-arrow img').css('display','none');
	$('.back').css('display','block');
}else{
	// 点击请登录的时候 跳转到登录界面
	$('.header').on('click',function(){
		window.location.replace('/login/index.html');
	});
	$('.please-log a').text('请登录');
	$('.header-arrow img').css('display','block');
	$('.back').css('display','none');
}
// 点击退出登录的时候
$('.back').on('click',function(){
	sessionStorage.clear();
	window.location.replace('index.html');
})
// 点击地址管理的时候
$('.item').on('click',function(){
	window.location.href='/address/index.html';
})
// 跳转我的订单页面
$('.my-order').on('click',function(){
	window.location.href = "/order/myOrder.html";
});