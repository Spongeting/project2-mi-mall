var id = location.search.slice(1).split('=')[1];
var num;
console.log(id);
$.myAjax({
	url: `/product/model/${parseInt(id)}`,
	success: function(data) {
		var banner = data.bannerImgs.split(',');
		banner.forEach(function(item) {
			$(`
				<div class="swiper-slide"><img src="${item}"></div>
			`).appendTo('.swiper-wrapper')
		});
		//异步执行
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
		//数据加载
		$(
			`
			<div class="biref-price data-id =${data.id}">
				<div>
					<span class="biref-price1">￥<span>
					<span class="biref-price2">${data.price}</span>
				</div>
				<i class="iconfont icon-shoucang"></i>
			</div>
			<p class="biref-tv">
				<img src="img/logo.png" class="biref-tv1" />
				<span class="biref-tv2">${data.name}</span>
			</p>
			<p class="biref-size">${data.brief}</p>
		`
		).appendTo('.biref');

		//详情图
		var img = data.otherImgs.split(',');
		img.forEach(function(item) {
			$(`
				<img src="${item}" />;
			`).appendTo('.detail-img');
		});
		//弹窗
		$('.choose').click(function() {
			$('.details-tan').stop().animate({
				height: "100%"
			}, 200);
			//点击页面关闭
			$('.details-tan').click(function(e) {
				var box = e.target.className == "detail-sm" ? e.target : $(e.target).parents('.detail-sm')[0];
				$('.chooseIn').val($('.num').html());
				if (box) {
					return;
				} else {
					$('.details-tan').stop().animate({
						height: "0"
					}, 200);
				}
			});
			//点击关闭X关闭
			$('.detail-close').click(function() {
				$('.details-tan').stop().animate({
					height: "0"
				}, 200);
				return false;
			})
		})
		//图片
		//console.log(data.avatar);


	}
});
//返回列表页
$('.header-back').click(function() {
	window.location.href = '/list/index.html';
});
//返回首页
$('.header-ellipsis').click(function() {
	window.location.href = '/home/index.html';
});
//点击增加数量
$('.Less').click(function() {
	num = $('.num').text();
	console.log(num);
	if (num <= 1) {
		layer.open({
			content: '商品数量已经达到最小了哟',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else {
		$('.num').html(--num);
	}
});
$('.add').click(function() {
	num = $('.num').text();
	if (num >= 5) {
		layer.open({
			content: '商品数量已经达到最大了哟',
			skin: 'msg',
			time: 2 //2秒后自动关闭
		});
	} else {
		$('.num').html(++num);
	}
});
//加入购物车
$('.footer2-jion').click(function() {
	$('.details-tan').stop().animate({
		height: "100%"
	}, 1000);
	//点击页面关闭
	$('.details-tan').click(function(e) {
		var box = e.target.className == "detail-sm" ? e.target : $(e.target).parents('.detail-sm')[0];
		$('.chooseIn').val($('.num').html());
		if (box) {
			return;
		} else {
			$('.details-tan').stop().animate({
				height: "0"
			}, 200);
		}
	});
});
//点击跳转页面
$('.footer-cart').click(function() {
	window.location.href = '/cart/index.html';
});
$('.detailspan1').click(function() {

	$.myAjax({
		url: `/cart/add`,
		type: "post",
		data: {
			pid: id,
			count: num
		},
		success: function(data) {
			console.log(num)
		}
	});
	window.location.href = '/cart/index.html';
});
//点击时将加入购物车的商品传递过去
$.myAjax({
	url: `/product/model/${parseInt(id)}`,
	success: function(data) {
		$(`
			<img src="${data.avatar}" />
		`).appendTo('.detail-smImg');
		//获得价格
		$(`
			<span>${data.price}</span>
		`).appendTo('.detail-money');
	}
});
