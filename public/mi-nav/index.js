// 用代码控制该谁激活
// 根据当前窗口的父窗口的location.href的值 判断出应该那个菜单处于激活状态
// console.log(window.parent.location.href);
// var page = '最后一个/和倒数第二个/之间的名字'；
// switch 判断这个名字 如果是对应的菜单的那个的话 让他拥有一个class为active
// date-属性：专门用来向一个标签中藏值
// 字符串解析 小括号分组 正则表达式内加小括号可以对内容进行分组
//.匹配所有 +匹配一个或者多个
//字符串的方法 返回的是数组 第一个表示正则表达式匹配到的所有结果  第二个表示第子分组匹配到的内容
//默认的是贪婪匹配 尽可能多的去匹配  设置成非贪婪匹配模式 (.+):尽量多的去匹配内容
// .+?
// 另一个方法 分割 提取我们需要的值
//location.href:当前窗口的IP地址
var reg = /.+\/(.+?)\/index.html$/;//扣我们要用的字符串
// var reg = /.+\/(.+)?\/index.html$/;
var pageName = window.parent.location.href.match(reg)[1];
// console.log( window.parent.location.href.match(reg)[1]);
// console.log(pageName);
$(`li[data-page=${pageName}]`).addClass('active');

// 点击跳转
$('li').on('click',function(){
	//点击那一个得到的就是那一个li藏的值 原生JS写法 不支持jQuery文件
	// 只要静态路径 就会自动到public下去找  只要是/就会到服务器mi下面去找
	window.parent.location.href = `/${this.dataset.page}/index.html`;
})