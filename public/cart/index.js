//点击<返回
$('.icon-back').on('click', function() {
	history.go(-1);
});
var idsArr = [];
//当前用户的购物车信息
$.myAjax({
	url: "/cart/list",
	type: "post",
	success: function(data) {
		//判断data的长度 大于0的时候创建 否则就显示默认的图片 判断有没有商品加入购物车
		if(data.length > 0){
			// 大于0的时候创建 否则就显示默认的图片
			$('.addProduct').stop().show();
			$('.default').stop().hide();
			//渲染页面 显示加入购物车的商品
			data.forEach(function(item) {
				$(`
					<li data-id="${item.id}">
						<input checked type="checkbox" class="ischeck"/>
						<div class="product">
							<img src="${item.avatar}" />
							<div class="product-text">
								<p class="product-text1">${item.name}</p>
								<div class="product-text2">
									<p class="product-text2_price">
										<span>￥</span>
										<span class="product-price">${item.price}.00</span>
									</p>
									<p class="product-text2_count">
										<span class="less">-</span>
										<span class="nums">${item.count}</span>
										<span class="add">+</span>
									</p>
								</div>
							</div>
						</div>
					</li>
				`).appendTo('ul.container-list')
			});
			sum();
			//增加数量 ++
			var count;
			$(".add").on('click', function() {
				count = $('.nums').html();
				if (count >= 5) {
					layer.open({
						content: '商品数量已经达到最大了哟',
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
					return;
				};
				var id = $(this).parents('li')[0].dataset.id;
				var addnum = parseInt($(this).parents('li').find('.nums').text())+1;
				$(this).parents('li').find('.nums').text(addnum);
				$.myAjax({
					url: `/cart/increase/${id}`,
					type: 'post',
					success: function(data) {
						
					},
				});
				sum();
			});
			//减少数量 --
			$('.less').on('click', function() {
				count = $('.nums').html();
				if (count <= 1) {
					layer.open({
						content: '商品数量已经达到最小了哟',
						skin: 'msg',
						time: 2 //2秒后自动关闭
					});
					return;
				}
				var id = $(this).parents('li')[0].dataset.id;
				var lessnum =parseInt( $(this).parents('li').find('.nums').text())-1;
				 $(this).parents('li').find('.nums').text(lessnum)
				$.myAjax({
					url: `/cart/decrease/${id}`,
					type: 'post',
					success: function(data) {
						
					}
				});
				sum();
			});
				//全选
			$('.checkAll').on('click',function(){
				// console.log($(this));
				if(this.checked == true){
					data.forEach(function(item){
						idsArr.push(item.id);
					});
					//console.log(idsArr);
					$('.ischeck').prop('checked',true);
					$('.checkAll').prop('checked',true);
					idsArr
					//console.log(idsArr)
				}else{
					idsArr = [];
					$('.ischeck').prop('checked',false);
					$('.checkAll').prop('checked',false);
				};
				sum();
			});
			//单选
			var length = 0;
			$('.ischeck').on('click',function(){
				if(this.checked === true){
					var index = $(this).parents('li').index();
					idsArr.push(data[index].id);
					// console.log(idsArr);
					length++;
				}else{
					//通过indexof找到下标
					var i = idsArr.indexOf(data[index]);
					idsArr.splice(i,1)
					// console.log(idsArr);
					length--;
				}
				if(length === data.length){
					$('.checkAll').prop('checked',true);
				}else{
					$('.checkAll').prop('checked',false);
				}
				sum();
			});
			//点击编辑的时候 
			$('.headers-edit').on('click',function(){
				if($(this).text() == '编辑'){
					$(this).text('完成');
					$('.total').css('display','none');
					$('.remove').stop().show();
					$('.settl').stop().hide();
				}else{
					$(this).text('编辑');
					$('.total').css('display','block');
					$('.remove').stop().hide();
					$('.settl').stop().show();
				};
			});
			//删除
			$('.remove').on('click',function(){
					$('ul.container-list li:has(input:checked)').remove();
					sum();
				$.myAjax({
					url:'/cart/remove',
					type:"post",
					data:{
						ids:idsArr
					},
					success:function(data){
						
					}
					});
			});
		}else{
			//data.length<0的时候 显示默认的图片 不显示
			$('.addProduct').stop().hide();
			$('.default').stop().show();
			$('.page-footer').css('display','none');
		}
	}
});
//获取当前的滚动高度
$('.page-scroll').scroll(function(){
	if($(this).scrollTop()>80){
		$('.hideHeader').stop().show();
		$('.headers-edit').css({
			color:'#333',
			fontSize:'16px'
		});
	}else{
		$('.hideHeader').stop().hide();
		$('.headers-edit').css({
			color:'#fff',
			fontSize:'16px'
		});
	}
})
//计算价格  所有能改变价格和数量的地方都要调用
function sum() {
 var total = 0;
 var counts = 0;
 var prices = 0;
 // console.log($('ul.container-list li:has(input:checked)').length);
 $('ul.container-list li:has(input:checked)').each(function(index, li){//jQuery中第一个是下标 第二个是元素
	// console.log(li);
	prices = parseInt($(li).find('.product-price').text());
	counts += parseInt($(li).find('.nums').text());
	var count = parseInt($(li).find('.nums').text());
	total = total + prices * count;
	//console.log(count);
 });
 $('.total-money').text(total);
 $('.settl').text(`结算(${counts})`);
 $('.remove').text(`删除(${counts})`);
}
//结算 将数组转换为字符串
$('.settl').on('click',function(){
	$.myAjax({
		url:"/cart/list_ids",
		type:"post",
		data:{
			"ids":idsArr
		},
		success:function(data){
			var str = idsArr.join('-');
			window.location.href = `/order/index.html?${str}`;
		}
	});
});
//去逛逛
$('.go').on('click',function(){
	window.location.href = '/home/index.html';
});