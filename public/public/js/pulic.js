
/* function aa(){
	console.log('11111');
} */
//利用className得到特定元素

function elementsByclassName(nodes,classStr){
				var oDivAll = nodes.getElementsByTagName('*');
				var res = [];
				for(var i = 0;i<oDivAll.length;i++){
					if(oDivAll[i].className == classStr){
						res.push(oDivAll[i]);
					}
				};
				return res;
			}
// query 兼容问题
function $(str){
				switch (str.charAt(0)){
					case '#':
					return document.getElementById(str.slice(1));//
					break;
					case '.':
					return elementsByclassName(document,str.slice(1));
					break;
					case '[':
					return document.getElementsByName(str.slice(6,str.length-1));
					break;
					default:
					return document.getElementsByTagName(str);
				}
			};