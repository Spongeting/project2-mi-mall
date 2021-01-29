//获取特定class元素的节点
function elementsByClassName(nodes, classStr) {
	var oDivAll = nodes.getElementsByTagName('*');
	var res = [];
	for (var i = 0; i < oDivAll.length; i++) {
		if (oDivAll[i].className == classStr) {
			// console.log(oDivAll[i]);
			res.push(oDivAll[i]);
		}
	}
	return res;
};

//封装$方法
function $(str) {
	switch (str.charAt(0)) {
		case '#':
			return document.getElementById(str.slice(1));
			break;
		case '.':
			return elementsByClassName(document, str.slice(1));
			break;
		case '[':
			return document.getElementsByName(str.slice(6, str.length - 1));
			break;
		default:
			return document.getElementsByTagName(str);
	}
};
//写一个方法可以获取范围内的随机数
function randomNum(start, end) {
	return parseInt(Math.random() * (end - start + 1) + start);
};

//时间格式
function sty(n) {
	return n < 10 ? '0' + n : n;
}
//时间格式
function getTime() {
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var date = d.getDate();
	var hour = d.getHours();
	var min = d.getMinutes();
	var sec = d.getSeconds();
	var day = d.getDay()
	var week = ['日', '一', '二', '三', '四', '五', '六']

	return year + '年' + sty(month) + '月' + sty(date) + '日 ' + sty(hour) + ':' + sty(min) + ':' + sty(sec) + '星期' + week[
		day]
}
