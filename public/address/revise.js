var pageBack = document.referrer.slice(21);
console.log(pageBack);
//当点击返回图标的时候返回上个页面 地址的index.html页面
$('.page-header i').on('click', function() {
	// console.log(111);
	window.location.replace('index.html');
})
// 利用ajax拿到index.html在li中藏的id值 通过id值获取信息 铺到编辑信息页面
//传值 在index.html页面通过跳转的那个点击事件利用location.href将id传递过来
//在需要revise.html页面利用location.search得到传过来的值 有其他符号 通过slice转换为整数型的id
var id = location.search.slice(1).split('=')[1]; //获取id
$.ajax({
	url: `/address/model/${parseInt(id)}`,
	type: "get",
	headers: {
		"Authorization": sessionStorage.getItem("token")
	},
	success: function(result) {
		// console.log(result.data.receiveDetail);
		if (result.code === 200) {
			$('input.name').val(result.data.receiveName);
			$('input.number').val(result.data.receivePhone);
			$('input.regions-picker').val(result.data.receiveRegion);
			$('.detail').val(result.data.receiveDetail);
		} else {
			console.log(result.msg);
		}
	}
})
// console.log(parseInt(location.search.slice(1)));
//当我点击保存按钮时的时候 和昨天的新增的操作一样 区别 获取id 弹层？保存成功
//单击保存按钮 进行非空验证 利用ajax传递给服务器 验证后返回数据
$('.page-footer').on('click', $.debounce(function() {
	$.ajax({
		url: "/address/update",
		type: "post",
		headers: {
			"Authorization": sessionStorage.getItem("token"),
			"Content-Type": "application/json"
		},
		data: JSON.stringify({
			id: parseInt(id),
			receiveName: $('input.name').val().trim(),
			receivePhone: $('input.number').val(),
			receiveRegion: $('input.regions-picker').val(),
			receiveDetail: $('input.detail').val()
		}),
		success: function(result) {
			//console.log(result);
			if (result.code === 200) {
				window.location.replace(pageBack);
				//history.back();
			} else {
				console.log(result.msg);
			}
		}
	})
},1000))
//点击删除的时候 弹层 是否确定删除吗？
$('.remove').on('click', function() {
	$.ajax({
		url: `/address/remove/${parseInt(id)}`,
		type: "get",
		headers: {
			"Authorization": sessionStorage.getItem("token"),
		},
		success: function(result) {
			{
				// console.log(result);
				if (result.code === 200) {
					layer.open({
						content: '您确定删除这个地址吗？',
						btn: ['确定', '取消'],
						yes: function(index) {
							location.reload();
							layer.close(index);
						}
					});
					window.location.replace(pageBack);
				} else {
					console.log(result.msg);
				}
			}
		}
	})
})
