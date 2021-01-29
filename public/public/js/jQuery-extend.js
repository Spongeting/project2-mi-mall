$.extend({
	myAjax:function(userOptions) {
	//构造默认配置 
	var defaultOptions = {
		type:'get',
		headers:{
			"Authorization":sessionStorage.getItem("token"),//服务器有需要的时候会自动解析 没有需要的话不会解析 服务器知道什么时候解析
			"Content-Type":"application/json"
		}
	};
	 //合并默认配置和用户配置
	var options = Object.assign({},defaultOptions,userOptions);
	if(options.data) options.data = JSON.stringify(options.data);
	options.success = function(result){
		if(result.code === 200){
			userOptions.success(result.data);
		}else{
			alert(result.msg);
		}
	}
	// 发起真正的ajax
	$.ajax(options);
},
//工具函数
	debounce: function(func,wait){
		var lock = false;//开着的
		return function(args) {//args 和事件绑定在一起的函数
			if(lock) return;
			look = true;
			setTimeout(function(){look = false},wait);
			func.call(this,args);//和事件绑定的函数指向的this 是事件 此时funcy已经没有绑定事件了 
			//这时候this指向的是window , 使用call的时候函数的this指向call的第一个参数 这里的this
			//是事件绑定的函数的this 让你的this等于事件绑定函数的this 后续使用的时候的this就是事件绑定的this
		}
	}
});

