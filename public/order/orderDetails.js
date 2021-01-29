//显示隐藏导航栏
$('.page-scroll').scroll(function(){
	if($(this).scrollTop() > 80){
		$('.hide-header').stop().show();
	}else{
		$('.hide-header').stop().hide();
	};
});

//返回上一页
$('.icon-back').on('click',function(){
	history.go(-1);
});
var orderNumber = location.search.slice(1).split("=")[1];
//console.log(orderNumber);
$.myAjax({
	url: '/order/list_all',
	success: function(data) {
		var data = data.filter(function(item) {
			return item.orderId === orderNumber;
		});
		data.forEach(function(item){
			//获取地址
			$(`
				<p>
					<span>${item.receiveName}</span>
					<span>${item.receivePhone}</span>
				</p>
				<p>${item.receiveRegion}</p>
			`).appendTo('.address');
			//获取订单编号
			$(`
				<span>订单编号</span>
				<span class="about-content_number">${item.orderId}</span>
			`).appendTo('.about-content')
			//获取订单详情
			//console.log(item.details);
			item.details.forEach(function(item){
				$(`
					<li>
						<div class="product-list">
							<!-- <div class="product-lists"> -->
							<img src="${item.avatar}" />
							<div class="product-list_text">
								<p>
									<span>${item.name}</span>
									<span>￥${item.price}.00</span>
								</p>
								<p>
									<span>x${item.count}</span>
								</p>
								<!-- </div> -->
							</div>
						</div>
						<!--内容尾部 -->
						<div class="product-footer">
							<span>联系客服</span>
						</div>
					</li>
				`).appendTo('.product')
			});

			//删除订单
			$('.page-footer').on('click',function(){
				var nums = item.orderId;
				console.log(nums);
				$.myAjax({
					url: `/order/remove/data.`,
					success: function(data) {
						layer.open({
							content: '删除成功！',
							skin: 'msg',
							time: 2 //2秒后自动关闭
						});
						history.back();
					}
				});
			});
		});
	}
});

