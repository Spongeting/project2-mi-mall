// 二级菜单
$('ul.list-main').on('click',function(e){
	// 发生点击事件的时候 要执行的操作 
	// 获取一级分类里面对于的id 
	//获取图片的id 激活相应的一级菜单显示对应的图片
	var li = e.target.tagName === 'LI' ? e.target : e.target.parentNode;
	// 控制一级分类li选中效果切换
	if($(li).hasClass('active')) return;
	$(li).addClass('active').siblings('.active').removeClass('active');
	// 控制右上角图片切换
	$('img.avatar').attr('src',li.dataset.avatar);
	// 利用ajax请求二级菜单数据
	//调用封装的ajax
	$.myAjax({
		  url: `/category/list/${li.dataset.id}`,
		  success:function(data){
			  $('ul.list-sub').empty().toggleClass('show',data.length > 0);
			  $('p.empty').toggleClass('show',data.length === 0); 
			  data.forEach(function(item) {
			      $(`
			          <li>
			              <a href='/list/index.html?cid=${item.id}'>
			                  <img src="${item.avatar}" />
			                  <span>${item.name}</span>
			              </a>
			  			</li>
			      `).appendTo('ul.list-sub');
			  })
		  }
	});
	});
/* 	$.ajax({
	         url: `/category/list/${li.dataset.id}`,
	         type: 'get',
	         success: function(result) {
	             if(result.code === 200) {
	                 $('ul.list-sub').empty().toggleClass('show',result.data.length > 0);
	                 $('p.empty').toggleClass('show',result.data.length === 0); 
	                 result.data.forEach(function(item) {
	                     $(`
	                         <li>
	                             <a href='/list/index.html?cid=${item.id}'>
	                                 <img src="${item.avatar}" />
	                                 <span>${item.name}</span>
	                             </a>
							</li>
	                     `).appendTo('ul.list-sub')
	                 })
					 //通过a标签的href把分类的id传递到商品列表当中去 用传参的形式传递id
					 //页面中传值最简单的做法就是问号传值
					 //通过window.location.search. 来获取这个值 注：需要转换为整形
	             }
	         }
	     })
}) */

// 展示数据->调整样式->默认一级分类的第一个分类处于激活状态  判断单击哪个菜单就让那个菜单处于激活状态
//(模拟li的点击事件多个li  事件委托给ul就没有办法   通过id 找到二级菜单的值取用)
//委托ul 没办法分清楚是那个li点击的 需要藏值 两个值 一个值去得到 li的id 另一个二级菜单里面的图片
//藏值的目的是为了更方便的去获取到图片和li的id
// 发送ajax请求 获取一级分类的数据 参数是对象 有多个键 和值

//调用ajax
$.myAjax({
	url:"/category/list/0",
	success:function(data){//走到这一步就说明已经验证了code=200了 执行下面的操作了
		data.forEach(function(item){//
			// 通过这个藏的这个id 在二级菜单中去得到他
			$(`	<li data-id=${item.id} data-avatar=${item.avatar}>
					<span>${item.name}</span>
				</li>`).appendTo('ul.list-main');
		});
		// trigger模拟触发第一个li的点击事件
		$('ul.list-main li').eq(0).trigger('click');
	}
});
/* $.ajax({//
	// 键：值，
	url:"/category/list/0",//请求路径 
	type:"get",//请求的类型 get/post  发出请求
	success:function(result){
		// 请求成功后 将返回来的数据(result)拼成多个li放在ul.list-main中
		//199:逻辑错误
		//500：物理错误
		//401：某些操作是需要登录的 无权限访问这个功能
		//404：不存在 路径存在错误
		// code:200 码
		//data 返回的数据
		//msg:报错的时候父级显示的内容
		//data:
		//id 当前分类的唯一标识
		//fid:0 表示一级分类 父级
		// 二级分类的fid就是一记分类里面的id
		//console.log(result);//目的验证是否请求成功 成功的话code=200 
		// console.log(data)
		if(result.code === 200) {
			result.data.forEach(function(item){
				// 通过这个藏的这个id 在二级菜单中去得到他
				$(`	<li data-id=${item.id} data-avatar=${item.avatar}>
						<span>${item.name}</span>
					</li>`).appendTo('ul.list-main');
			});
			// trigger模拟触发第一个li的点击事件
			$('ul.list-main li').eq(0).trigger('click');
		}
	}
}); */
//ES6  
//ES ECMA Script 2015 10月之前的叫ES5 ""+""
//ES6  2015年10月以后更新的版本 每年都会更新 只有ES6改变的最大 `${}`



