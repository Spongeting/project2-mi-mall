// 表单验证
// 用户名验证
$('.user').Validform({
	tiptype: 3,
	datatype: {
		usernames: function(gets, obj, curform) {
			var reg = /^\w{3,15}$/;
			if (!reg.test(gets)) return false;
			var result;
			$.ajax({
				async: false,
				url: "/user/check_name/" + gets,
				type: "get",
				success: function(response) {
					console.log(response.data);
					if (response.code === 200) {
						result = response.data === 0 ? true : "用户名已存在";
					} else {
						result = response.msg;
					};
				},
				error: function() {
					result = "服务器验证失败";
				}
			});
			return result;
		},
		//手机号码验证
		userphone: function(gets, obj, curform) {
			var reg2 = /^1\d{10}$/;
			if (!reg2.test(gets)) return false;
			var result2;
			$.ajax({
				async: false,
				url: "/user/check_phone/" + gets,
				type: "get",
				success: function(response) {
					if(response.code === 200){
						result2 = response.data === 0 ? true : "手机号码已存在";
					}else{
						result2 = response.msg;
					};
				},
				error: function() {
					result2 = "服务器验证失败";
				}
			});
			return result2;
		}
	}
});

//注册：
$('.register').on('click', function() {
	var users = $('.username input').val();
	var phone = $('.number input').val();
	var pwd = $('.password input').val();
	console.log(pwd)
	$.myAjax({
		url: "/user/register",
		type: "post",
		data: {
			name: users,
			pwd,
			phone
		},
		success: function(data) {
			window.location.href = "/login/index.html";
		}
	});
});
