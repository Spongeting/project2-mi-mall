//返回上一页
$('.icon-back').on('click',function(){
	history.go(-1);
});
var address;

//获取地址
$.myAjax({
	url:"/address/get_default",
	success:function(data){
		address = data.id;
		$(`
			<p>
				<span>${data.receiveName}</span>
				<span>${data.receivePhone}</span>
			</p>
			<p>${data.receiveRegion}</p>
		`).appendTo('.address-text');
	}
});
/* setTimeout(function(){
	console.log(address);
},1000); */

//弹层出现
$('.address').on('click',function(){
	$('.hide-pop').css('display','block');
	$('.hide-smPop').stop().show();
});
//关闭弹层
$('.hide-pop').on('click',function(){
	$('.hide-pop').css('display','none');
	$('.hide-smPop').stop().hide();
});
$('.hide-smPop_header img').on('click',function(){
	$('.hide-pop').css('display','none');
	$('.hide-smPop').stop().hide();
});
//弹层中获取所有地址
$.myAjax({
	url:"/address/list",
	success:function(data){
		data.forEach(function(item){
			$(`
				<li class="hide-smPop_contents" data-id = "${item.id}">
					<input type="radio" name="" />
					<div class="smPop_contents_text">
						<p>
							<span>${item.receiveName}</span>
							<span>${item.receivePhone}</span>
						</p>
						<p>${item.receiveRegion}</p>
					</div>
					<img src="img/edit.png" class="smPop_contents_textEdit" />
				</li>
			`).appendTo('ul.hide-smPop_content');
		}); 
		//更改地址
		$('ul.hide-smPop_content').on('click','.smPop_contents_text',function(){
			// console.log($(this));
			$('.address-text').html($(this).html()); 
			$('.hide-pop').css('display','none');
			$('.hide-smPop').stop().hide();
			var hideAddress = $(this).parents('li')[0].dataset.id;
			//console.log(hideAddress);
			address = hideAddress;
		});
		//修改地址
		$('.smPop_contents_textEdit').on('click',function(){
			var ids = $(this).parents('li')[0].dataset.id;
			//console.log(ids);
			window.location.href = `/address/revise.html?id=${ids}`;
		});
		//添加地址
		$('.hide-smPop_footer').on('click',function(){
			window.location.href = '/address/newAdd.html';
		});
	}
});
//渲染商品信息 字符串转为数组
var idArr = location.search.slice(1).split("-");
var total = 0;
$.myAjax({
	url:"/cart/list_ids",
	type:"post",
	data:{
		ids:idArr
	},
	success:function(data){
		data.forEach(function(item){
			$(`
				<li>
					<img src="${item.avatar}" />
					<div class="product-commodity_brief">
						<p>${item.name}</p>
						<p>
							<span class="commodity-Amount">
								<span>￥</span>
								<span class="commodity-money">${item.price}.00</span>
							</span>
							<span>
								<span>x</span>
								<span class="commodity-count">${item.count}</span>
							</span>
						</p>
						<p>7天无理由退货</p>
					</div>
				</li>
			`).appendTo('ul.product-commodity');
			//计算总价
			total = total + Number(`${item.price}`) * Number(`${item.count}`);
		});
		$('.discount-content_totalMoney').html("￥"+total+".00");
		$('.total-money').html(total+".00");
		
		//结算跳转确认订单页面
		$('.confirmOrder').on('click',function(){
			$.myAjax({
				url:"/order/confirm",
				type:"post",
				data:{
					"ids": idArr,
					"account": total,
					"addressId": address
				},
				success:function(data){
					window.location.href = `confirmOrder.html?data=${data}`;
				}
			});
			
		});
	}
	
	
});
//显示隐藏导航栏
$('.page-scroll').scroll(function(){
	if($(this).scrollTop() > 80){
		$('.hideHeader').stop().show();
	}else{
		$('.hideHeader').stop().hide();
	};
});
