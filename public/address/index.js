// 点击的时候调到新增地址的页面
$('.page-footer span').on('click',function(){
	// 注：原生的js要用等号连接
	console.log(111);
	window.location.href='/address/newAdd.html';
})
// 跳转的时候改变span的背景颜色
$('.page-footer span').on('mousedown',function(){
	$('.page-footer span').css('background','#eee');
})
// 点击显示返回的那张图片的时候返回到上一个页面
$('.page-header img').on('click',function(){
	// console.log(111);
	window.location.replace('/profile/index.html')
})

$.ajax({
	url:"/address/list",
	type:'get',
	headers:{
		"Authorization":sessionStorage.getItem("token"),
	},
	success:function(result){
		// console.log(result);
		if(result.code === 200){
			// 判断data长度 大于0 创建
			if(result.data.length>0){
				result.data.forEach(function(item){
					$(`
						<li data-id=${item.id}>
							<span>${item.receiveName}</span>
							<span>${item.receivePhone}</span>
							<p>${item.receiveRegion}</p>
							<img src="img/bun.png" class='onImg' />
							<div class='default${item.isDefault?" is-default":""}'>[设置为默认地址]</div>
						</li>
					`).appendTo('ul.newAdd');
				});
				//点击编辑的小图标 进入编辑地址页面 问题 如何通过es6写法来获取用es6创建的标签呢
				$('.onImg').on('click',function(){
					var id = this.parentNode.dataset.id;//注意data-只支持js原生写法
					// console.log(id);
					window.location.href = `revise.html?id=${id}`;
				})
				
				$('.oldAdd').stop().hide();
				$('.newAdd').css('display','block');
			}else{
				$('.oldAdd').stop().show();
				$('.newAdd').css('display','none');
			}
			//当点击的时候 将地址改为默认地址
			$('ul.newAdd').on('click',".default",function(){
				if($(this).hasClass('is-default')) return;
				var id = this.parentNode.dataset.id;//注意data-只支持js原生写法
				$.ajax({
					url:`/address/set_default/${id}`,
					type:"get",
					headers:{
						"Authorization":sessionStorage.getItem("token"),
					},
					//这一步之后 能打印出result之后 就成功设置默认地址了
					success:function(result){
						console.log(result);
						if(result.code === 200){
							//弹窗提示
							 layer.open({
							     content: '设置成功'
							     ,skin: 'msg'
							     ,time: 2 //2秒后自动关闭
							   });
							setTimeout(function(){
								history.go(0);//刷新页面
							},500);
							//bug:当你设置成默认地址之后 再次点击默认地址 也会出现设置成功的弹层？
						}else{
							console.log(result.msg);
						}
					}
				})
			})
		}else{
			console.log(result.msg);
		}
	}	
})

//登录之后获取初始的默认地址
	$.ajax({
		url:"/address/get_default",
		type:"get",
		headers:{
			"Authorization":sessionStorage.getItem("token"),
		},
		success:function(result){
			// console.log(result);
			if(result.code = 200){
				$(`li[data-id=${result.data.id}]`).find('.default').text('[默认地址]');//注意 要用es6的写法写id
				$(`li[data-id=${result.data.id}]`).find('.default').css('color','red');
			}else{
				console.log(result.msg);
			}
		}
	})
	


