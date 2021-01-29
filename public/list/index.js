//返回上一页
$('.icon-back').on('click',function(){
	window.location.href = '/category/index.html';
})
// 开始的给他模拟一个点击事件 默认是这个颜色
$('ul.page-sort li').on('click',function(){
	$(this).css('color','rgb(180,115,31)').siblings().css('color','#333');
})

//全局变量
var price = "price";
var orderDir = 'asc';
var name = '';
var count = 0;
//升降序
var isSort = false;
$('.ascs').click($.debounce(function(){
	// console.log(123)
	orderDir == "asc" ? orderDir = 'desc':orderDir = 'asc';//来回切换
	$('ul.column').empty();//清空
	sorts();//调用函数
	if(isSort){
		$('.icon-sort-asc').css('display','block');
		$('.icon-sort-desc').css('display','none');
		isSort = false;
	}else{
		$('.icon-sort-asc').css('display','none');
		$('.icon-sort-desc').css('display','block');
		isSort = true;
	}
},1000));

//价格
$('.prices').click($.debounce(function(){
	price = 'price';
	isKa = true;
	$('ul.column').empty();
	sorts();
},1000));
//销量
$('.sales').click($.debounce(function(){
	price = 'sale';
	$('ul.column').empty();
	isKa = true;
	sorts();
},1000));
//评论
$('.rates').click($.debounce(function(){
	price = 'rate';
	$('ul.column').empty();
	isKa = true;
	sorts();
},1000));
//搜索 定义一个全局变量name 将name的值等于从input中获取的值 调用这个函数就可以了
$('.find').click($.debounce(function(){
	$('.icons-left').css('display','none');
	$('.find-bun').css('display','block');
	$('.find-bun').click(function(){
		name = $('.find-Input').val();
		$('ul.column').empty();
		sorts();
	});
},1000));
//思路 两个盒子 外面盒子的高度小于里面盒子的 给外面的盒子加滚动条和滚动事件 
//用height()函数获取两个盒子自身的高度 得到两个盒子高度的差 当当前滚动的高度大于这个差....
//就让count的值等于当前li的个数 再调用ajax 
$('.page-container').scroll(function(){//给父元素加滚动事件 监听父元素的滚动
	var newScr = $(this).scrollTop();//获取当前的滚动高度
	var box = $('.page-container').height();//获取div自身的高度
	if(newScr>box){
		$('.goTop').css('display','block');
		$('.goTop').click(function(){
			$('.page-container').scrollTop(0,0);
		})
	};
	if(isKa == false) return;//
	var uls = $('.column').height();//获取ul自身的高度
	var cha = uls-box;//两个差
	if(newScr >= cha){
		count = $('.column li').length;
		sorts();
	};
	//回到顶部
})
sorts();
//利用ajax获取数据
var cid = location.search.slice(1).split('=')[1];
//console.log(cid);
var isKa = true;//没有
function sorts(){
	$.myAjax({
		url:"/product/list",
		type:"post",
		data:{
			name:name,
			cid:parseInt(cid),
			orderCol:price,
			orderDir:orderDir,
			begin:count,
			pageSize: 6
		},
		success:function(data){
			if(data.length<6){
				isKa = false;//锁住
			}
			data.forEach(function(item){
				$(`
					<li data-id=${item.id}>
						<img src = "${item.avatar}" />
						<div>
							<p class="name">${item.name}</p>
							<p class="brief">${item.brief}</p>
							<span class="pricei">￥</span>
							<span class="price">${item.price}.00</span>
							<p>
								<span class="sale">销量:${item.sale}</span>
								<span class="rate">评论:${item.rate}</span>
							</p>
						</div>
					</li>
				`).appendTo('ul.column');
			})
		}
	});
}
// 调用函数
//点击切换样式
$('.icons-left').on('click',function(){
	//当ul有这个小名的时候去掉 没有的时候给他加上 toggleClass切换指定的值
	$('.column').toggleClass('list');
	if(isAscs){
		$('.icon-category').stop().show();
		$('.icon-listview').stop().hide();
	}else{
		$('.icon-category').stop().hide();
		$('.icon-listview').stop().show();
	}
})
//点击ul下的每一个li的时候将id传递过去 事件委托
$('.column').on('click',function(e){
	var li = e.target.tagName === 'LI' ? e.target : e.target.parentNode;
	var cid = li.dataset.id;//取出id
	console.log(cid);
	window.location.href = `/details/index.html?cid=${cid}`;
})







