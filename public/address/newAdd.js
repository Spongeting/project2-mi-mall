var pageBack = document.referrer.slice(21);
//当点击保存的时候 将所有的值input的值获取到
$('.page-footer').on('click',$.debounce(function(){
	// 判断姓名和电话号码是否输入正确
	//收集新增地址的信息非空验证->通过ajax传递给服务器 服务器验证后返回数据
	$.ajax({
		url:"/address/add",
		type:"post",
		headers:{
			"Authorization":sessionStorage.getItem("token"),
			"Content-Type":"application/json"
		},
		data: JSON.stringify({
			receiveName:$('input.name').val().trim(),
			receivePhone:$('input.number').val(),
			receiveRegion:$('input.regions-picker').val(),
			receiveDetail:$('input.detail').val()
		}),
		success: function(result){
			// console.log($('input.regions-picker').val());
			if(result.code === 200){
				// 添加成功 返回添加完后地址的id
				window.location.href = pageBack;
				 // history.go(-1);
			}else{
				console.log(result.msg);
			}
		}
	})
},1000))
// 点击左上角返回按钮的时候
//返回到上一层页面
$('.page-header img').click(function(){
	console.log(1111);
	window.location.replace('index.html');
})
