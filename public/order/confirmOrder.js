//返回上一页
$('.icon-back').on('click',function(){
	console.log(111);
	layer.open({
	    content: '您现在在支付页面 确定离开吗'
	    ,btn: ['确认离开', '继续支付']
	    ,skin: 'footer'
	    ,yes: function(index){
	     history.go(-1);
	    }
	  });
})
//倒计时：
var minute = 29;
var second = 59;
setInterval(function() {
	second--;
	if (second == 00 && minute == 00) {
		minute = 29;
		second = 59;
	}; //当分钟和秒钟都为00时，重新给值
	if (second == 00) {
		second = 59;
		minute--;
		if (minute < 10) minute = "0" + minute;
	}; //当秒钟为00时，秒数重新给值
	if (second < 10) second = "0" + second;
	$(".minute").text(minute);
	$(".second").text(second);
}, 1000);

//获取金额
var orderNum = location.search.slice(1).split("=")[1];
$.myAjax({
	url:`/order/account/${orderNum}`,
	success:function(data){
		$('.container_golds').text(data);
		$('.footer-pay').text("确认支付￥"+data+".00");
	}
});
//跳转我的订单
$('.footer-pay').on('click',function(){
	$.myAjax({
		url:`/order/pay/${orderNum}`,
		success:function(data){
			//console.log(data);
			 layer.open({
			    content: '支付成功'
			    ,skin: 'msg'
			    ,time: 2 //2秒后自动关闭
			  });
			window.location.href = "myOrder.html";
		}
	});
});