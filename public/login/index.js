// 用户名密码登录与手机验证码登录模式的切换
$('button.btn-toggle').on('click',function(){
	$('.login-pwd, .login-phone').toggleClass("show");
})
// 手机号验证码登录
$('button.btn-login-phone').on('click',function(){
	alert('手机号验证码登录功能暂未开放 请切换用户密码登录')
})
// 用户名密码登录 验证用户输入的对不对 对的话将内容收集起来 向ajax发送个后台 
$('button.btn-login-pwd').on('click',function(){
	//收集用户信息 进行非空验证 
	//将收集的内容通过ajax发送给后台 后台验证后再返回回来
	
	// 怎样把用户输入的用户名和密码发送给服务器
	// trim()；去除前后的无效的空格 中间的无效
	$.ajax({
		url:"/user/login_pwd",//向服务器传递数据的请求路径
		type:"post",//
		// headers：用于设置请求头 ？
		//后台服务器要求我们传递的数据是一个json类型的字符串
		headers:{
			"Content-type":"application/json"
		},
		// 将我前面的对象的类型的数据 转换为json类型的字符串让后台识别
		data: JSON.stringify({
			name:$('input.name').val().trim(),
			pwd:$('input.pwd').val()
		}),
		// 返回一个数据
		success: function(result){
			// 返回的是 令牌机制 随机产生的一段字符串  登录的本质目的是得到令牌 
			// 令牌得到后需要存储之后在一个地方 再次发ajax的时候需要带上 
			//浏览器存储东西的地方：cookie  sessionStorage localStorage
			//容器 关闭浏览器sessionStorage消失
			//get；获取  remove:移除 clear();清除
			//返回的是token
			//console.log(result);
			if(result.code === 200){
				// 登录之后将内容存在到sessionStorage中去 
				sessionStorage.setItem("token",result.data);
				sessionStorage.setItem("name",$('input.name').val().trim());
				// 项目中很多页面是都是不能退回去的 不让页面后退回去
				window.location.replace("/profile/index.html");
			}else{
				// 登录不成功 打印出错误
				alert(result.msg);
			};
		}
	});
});
//跳转注册页面
$('.register').on('click',function(){
	window.location.href = 'register.html';
});
