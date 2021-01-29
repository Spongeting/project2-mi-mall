//选项卡
$('ul.page-tab').on('click', 'li', function() {
	if ($(this).hasClass('active')) return;
	$(this).addClass('active').siblings('.active').removeClass('active');
	$('.page-container ul').eq($(this).index()).addClass('active').siblings('.active').removeClass('active');
});
//返回个人中心
$('.icon-back').on('click', function() {
	window.location.href = "/profile/index.html";
})
//获取全部信息 
$.myAjax({
	url: "/order/list_all",
	success: function(data) {
		data.forEach(function(item) {
			$(
				`
				<li data-id="${item.orderId}">
					<div class="container-list_header">
						<div class="list-header-text">
							<img src="img/logo.png" />
							<span>小米自营</span>
						</div>
					</div>
					
					<div class="container-list_content">
						
					</div>
					
					<div class="page-container_footer">
						<div class="container_footer_total">
							<span>总金额￥${item.account}.00</span>
							<span>共${item.details.length}件商品，</span>
						</div>
						<div class="container_footer_goBuy">
							<span class="remove">删除订单</span>
							<span>再次购买</span>
						</div>
					</div>
				</li>
			`
			).appendTo('ul.container-list');
		});

		//删除订单

		$('.remove').on('click', function() {
			var removeId = $(this).parents('li')[0].dataset.id;
			 $(this).parents('li').remove();
			$.myAjax({
				url: `/order/remove/${removeId}`,
				success: function(data) {
					layer.open({
						content: '删除成功！',
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
				}
			});
		});
		
		
		//跳转到订单详情页面
		$('ul.container-list').on('click','li',function(){
			var detailsId = $(this)[0].dataset.id;
			//console.log(detailsId);
			window.location.href = `orderDetails.html?orderNumber=${detailsId}`;
		});
	}
});
//待付款订单
$.myAjax({
	url: "/order/list_unpay",
	success: function(data) {
		data.forEach(item => {
			//外面
			$(
				`
					<li data-id="${item.orderId}">
						<!-- 头部 -->
						<div class="container-list_header">
							<div class="list-header-text">
								<img src="img/logo.png" />
								<span>小米自营</span>
							</div>
							<span class="pengding-pays">待付款</span>
						</div>
						<!-- 内容 -->
						<div class="container-list_content">
							
						</div>
						<!--内容尾部 -->
						<div class="page-container_footer">
							<div class="container_footer_total">
								<span>总金额￥${item.account}.00</span>
								<span>共${item.details.length}件商品，</span>
							</div>
							<div class="pending-pay_footer_goBuy">
								<span>去支付</span>
							</div>
						</div>
					</li>
				`
			).appendTo('ul.pending-pay');
			//内部
			var contentDiv = $(`li[data-id="${item.orderId}"]`).find(".container-list_content");
			//console.log(contentDiv[0]);
			item.details.forEach(item => {
				//console.log(item);
				$(
					`
						<div class="container-list_contents">
							<img src="${item.avatar}" />
							<div class="product-list_text">
								<p>
									<span>${item.name}</span>
									<span>￥${item.price}.00</span>
								</p>
								<p>
									<span>x${item.count}</span>
								</p>
							</div>
						</div>
					 `
				).appendTo(contentDiv);
			});
		});
	}
});
//待收货 已付款订单
$.myAjax({
	url: "/order/list_pay",
	success: function(data) {
		//console.log(data);
		data.forEach(item => {
			//外面
			$(
				`
					<li data-id="${item.orderId}">
						<!-- 头部 -->
						<div class="container-list_header">
							<div class="list-header-text">
								<img src="img/logo.png" />
								<span>小米自营</span>
							</div>
							<span class="pengding-pays">已付款</span>
						</div>
						<!-- 内容 -->
						<div class="container-list_content">
							
						</div>
						<!--内容尾部 -->
						<div class="page-container_footer">
							<div class="container_footer_total">
								<span>总金额￥${item.account}.00</span>
								<span>共${item.details.length}件商品，</span>
							</div>
							<div class="pending-pay_footer_goBuy">
								<span>待收货</span>
							</div>
						</div>
					</li>
				`
			).appendTo('ul.pending-goods');
			//内部
			var contentDiv = $(`li[data-id="${item.orderId}"]`).find(".container-list_content");
			item.details.forEach(item => {
				$(
					`
						<div class="container-list_contents">
							<img src="${item.avatar}" />
							<div class="product-list_text">
								<p>
									<span>${item.name}</span>
									<span>￥${item.price}.00</span>
								</p>
								<p>
									<span>x${item.count}</span>
								</p>
							</div>
						</div>
					 `
				).appendTo(contentDiv);
			});
		});
	}
});
