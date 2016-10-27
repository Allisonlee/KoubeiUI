/*! 口碑插件&Table EditForm 元素 v0.0.1 ~ (c) 2016-2016 @快叫我韩大人 ~ http://weibo.com/hoythan */
!(function (window, document, Math) {
	var KouBeiEditForm = function(el,options){
		this.el = el;
	    this.defaults = {

	    };
	    /* 合并参数 */
	    this.options = $.extend({},this.defaults,options);
	    this._Init();
	}
	KouBeiEditForm.prototype = {
		_Init:function(){
			$(this.el).find('.kb-editform-number').each(function(index, el) {
				$(this).find('.kb-number-input').prepend('<div class="kb-number-handler"><div class="kb-number kb-number-up"><i class="kb-icon-arrow"></i></div><div class="kb-number kb-number-down"><i class="kb-icon-arrow-down"></i></div></div>');
				$(this).find('.kb-number-handler').on('click', '.kb-number-up', function(event) {
					$(el).find('input').attr('placeholder','');
					var num = parseInt($(el).find('input').val());
					if($(el).find('input').val() == ''){
						num = 0;
					}
					$(el).find('input').val(num + 1);
				});
				$(this).find('.kb-number-handler').on('click', '.kb-number-down', function(event) {
					$(el).find('input').attr('placeholder','');
					var num = parseInt($(el).find('input').val());
					if($(el).find('input').val() == ''){
						num = 0;
					}
					$(el).find('input').val(num - 1);
				});
			});
			$(this.el).find('input[type="number"]').each(function(index, el) {
				if($(this).val() == ''){
					$(this).val('');
				}

			});
		},
		AddSelect:function(ele,options){
			var defaulopt = {
		        'search': false,
		        'callback': {
		        	'kbcb_open' : '', // 打开窗口
		        	'kbcb_select' : '', // 选择内容
		        	'kbcb_clear' : '', // 清空按钮
		        }
		    };
		    ele.options = $.extend({},defaulopt,options);
		    ele.options.type = 'select';
			if($(this.el).find(ele).length == 0){
				return false;
			}
			this._ResetSelect(ele);

		},
		AddInputGroup:function(ele,options){
			var defaulopt = {
		        'callback': {
		        	'kbcb_after' : '', // 结束回调
		        }
		    };
		    ele.options = $.extend({},defaulopt,options);
			var form = this;
			var max,json,copyhtml;
			// 获取文档格式
			$.data(ele, 'html',$(ele).find('.kb-inputgroup').html());
			// 清空默认文档
			$(ele).find('.kb-inputgroup').html('');

			max = $(ele).data('kbmax');
			if(max == undefined || max == '' || max == '0'){
				max = 1;
			}
			json = $(ele).data('kbjson');
			if(json == undefined || json == ''){
				json = $.parseJSON('[{"input": "","textarea": ""}]');
			}

			$.each(json,function(i, item) {
				if(i + 1 > max){
					return false;
				}
				$(ele).find('.kb-inputgroup').append($.data(ele, 'html'));
				if(i != 0){
					$(ele).find('.kb-inputbtn').eq(i).append('<a class="kb-editlink">删除</a>');
				}

				$(ele).find('input').eq(i).val(item.input);
				$(ele).find('textarea').eq(i).val(item.textarea);
			});
			$(ele).find('.kb-inputbtn').eq(0).append('<a class="kb-editlink">增加</a>');
			$(ele).find('.kb-inputbtn').eq(0).addClass('kb-add-item');
			$(ele).find('.kb-inputbtn').eq(0).on('click', '', function() {
				var num = $(ele).find('.kb-inputbtn').length;
				if(num >= max){
					return false;
				}
				$(ele).find('.kb-inputgroup').append($.data(ele, 'html'));
				$(ele).find('.kb-inputbtn').eq(num).append('<a class="kb-editlink">删除</a>');
				form._ReBindInputGroup(ele);
				// 结束回调
				if(ele.options.callback.kbcb_after != undefined && ele.options.callback.kbcb_after != ''){
					ele.options.callback.kbcb_after(ele);
				}
			});
			form._ReBindInputGroup(ele);
			// 结束回调
			if(ele.options.callback.kbcb_after != undefined && ele.options.callback.kbcb_after != ''){
				ele.options.callback.kbcb_after(ele);
			}
		},
		AddUploadFile:function(ele,options){
			var defaulopt = {
		        'callback': {
		        	'kbcb_errornum' :'',
		        	'kbcb_errorsize':'',
		        	'kbcb_errortype':'',
		        	'kbcb_upload':'', // 文件上传
		        	'kbcb_uploaded': '', // 文件上传成功请使用该参数设置状态
		        	'kbcb_deleteimg':''
		        }
		    };
		    ele.options = $.extend({},defaulopt,options);
			var addimg = $(ele).find('.kb-addimage');
			$(addimg).append('<form enctype="multipart/form-data"><input name="file" type="file" /><input type="button" value="Upload"/><div class="kb-icon-add"></div><span>上传照片</span></form>');
			var fileform = $(addimg).find('form');
			// 插入默认数据
			if($(ele).data('kbcontant') != ''){
				var kbcontant = $(ele).data('kbcontant');
				var itemBind = new Array();
				for (var i = 0; i < $(kbcontant).length; i++) {
					var src = kbcontant[i].url;
					var tmpclass = 'itme-'+this._GetRandomString();
					$(addimg).before('<div class="kb-file-item '+tmpclass+'"><img data-original="'+src+'"><div class="kb-item-manage-btn kb-flex-center"><div data-src="'+src+'" class="kb-file-views kb-item-btn kb-imageshow"><i class="kb-icon-view"></i></div><div class="kb-file-transh kb-item-btn"><i class="kb-icon-trash"></i></div></div></div>');
					itemBind.push($('body').find('.'+tmpclass));
				}
				$(itemBind).each(function(index, el) {
					$(this).one('click','.kb-file-transh',function(event) {
						// 上传文件
						if(ele.options.callback.kbcb_deleteimg != undefined && ele.options.callback.kbcb_deleteimg != ''){
							ele.options.callback.kbcb_deleteimg($(el));
						}
						$(el).remove();
					});
				});
			}
			$(addimg).find('input[type="file"]').on('change', '', function(event){
				if($(ele).find('.kb-file-item').length >= $(ele).data('kbmax')){
					new KoubeiMsgBox({
						'btn' : 1,
						'type' : 'warning',
						'content': {
							'title' : '上传错误',
							'subtitle' : '当前上传数量已经超过限定要求,请删除一些再试.'
						}
					});
					return false;
				}
				var file = this.files[0],
				    name = file.name,
				    size = file.size,
				    type = file.type;
				var limit = new Array('image/bmp','image/jpeg','image/gif','image/png');
				var ok = false,msglog = '';
				$.each(limit,function(index, el) {
					if(type == el){
						ok = true;
					}
				});

				if(size > 5240000){
					new KoubeiMsgBox({
						'btn' : 1,
						'type' : 'warning',
						'content': {
							'title' : '上传错误',
							'subtitle' : '文件尺寸过大,请选择图片容量小于5MB的图片文件.'
						}
					});
					return false;
				}
				if(ok === false){
					new KoubeiMsgBox({
						'btn' : 1,
						'type' : 'warning',
						'content': {
							'title' : '上传错误',
							'subtitle' : '文件格式不符合要求,请检查后再试.'
						}
					});
					return false;
				}

				var reader = new FileReader();  
				//将文件以Data URL形式读入页面
				reader.readAsDataURL(file);  
				reader.onload = function(e){  
				    var src = this.result;
				    $(addimg).before('<div class="kb-file-item"><img src="'+src+'"><span>正在上传</span><div class="kb-hide kb-item-manage-btn kb-flex-center"><div class="kb-file-transh kb-item-btn"><i class="kb-icon-trash"></i></div></div></div>');
				    var item = $(ele).find('.kb-file-item').eq($(ele).find('.kb-file-item').length - 1);
				    $(item).on('click', '.kb-file-transh', function(event) {
				    	$(item).remove();
				    });
					// 上传文件
					if(ele.options.callback.kbcb_upload != undefined && ele.options.callback.kbcb_upload != ''){
						ele.options.callback.kbcb_upload(fileform,e,item);
					}
				}
			});
		},
		AddLinkSelect:function(ele,link,options){
			var defaulopt = {
		        'callback': {
		        	'kbcb_reset' :'',
		        }
		    };
		    ele.options = $.extend({},defaulopt,options);
			// 组织 link 
			$(link).append('<ul></ul>');
			$(ele).on('click', 'h2', function(event) {
				var select = false;
				if($(this).attr('checked')){
					select = true;
				}
				if(select){
					$(this).find('span').removeClass('kb-select-on');
					$(this).removeAttr('checked');
				}else{
					$(this).find('span').addClass('kb-select-on');
					$(this).attr('checked','checked');
				}

				if($(this).hasClass('kb-select-all')){
					if(select){
						$(this).next('ul').find('h2').each(function(index, el) {
							$(this).find('span').removeClass('kb-select-on');
							$(this).removeAttr('checked');
						});
					}else{
						$(this).next('ul').find('h2').each(function(index, el) {
							$(this).find('span').addClass('kb-select-on');
							$(this).attr('checked','checked');
						});
					}
				}else{
					if(select){
						var allbtn = $(this).parent('li').parent('ul').parent('li').find('.kb-select-all');
						$(allbtn).find('span').removeClass('kb-select-on');
						$(allbtn).removeAttr('checked');
					}
				}

				// 遍历一次所有的二级选中项目
				var item = new Array();
				$(ele).find('ul ul li').each(function(index, el) {
					var check = false;
					if($(this).find('h2').attr('checked')){
						check = true;
					}
					if(check){
						item.push($(this));
					}
				});
				$(link).find('ul').html('');
				if(item.length > 0){
					$(item).each(function(index, el) {
						$(link).find('ul').append($(this).prop('outerHTML'))
					});
				}
				$(link).on('click', 'li', function(event) {
					var i = $(this).index();
					var n = 0;
					$(ele).find('ul ul li').each(function(index, el) {
						if($(this).find('h2').attr('checked')){
							if(n == i){
								$(this).find('h2').click();
							}
							n++;
						}
					});
				});
			});
			// 初始化
			$(ele).find('ul li ul h2').each(function(index, el) {
				if($(this).attr('checked')){
					$(this).removeAttr('checked');
					$(this).click();
				}
			});
			if(ele.options.callback.kbcb_reset != undefined && ele.options.callback.kbcb_reset != ''){
				ele.options.callback.kbcb_reset();
			}
		},
		_ResetSelect:function(ele){
			var form = this;
			var select = $(this.el).find(ele);
			$(select).off();
			$(document).on('click', function(event) {
				if($(select).hasClass('kb-openselect')){
					$(select).removeClass('kb-openselect');
					$(select).find('.kb-icon-arrow-down').css({
						'opacity': 0,
						'visibility': 'hidden'
					});
					$(select).find('.kb-icon-min-close').css({
						'opacity': 1,
						'visibility': 'visible'
					});
					$(select).removeClass('kb-openselect');
				}
			});
			// 元素配置
			$(select).find('.kb-select').after('<span class="kb-select-icon kb-icon-arrow-down"></span><span class="kb-select-icon kb-icon-min-close" style="opacity: 0;visibility: hidden"></span>');
			if(ele.options.search){
				$(select).find('.kb-overflow-y ul').before('<input type="text" class="kb-searchbox" >');
			}
			// 绑定元素事件
			$(select).on('click', '.kb-select-scroll', function(event) {
				event.preventDefault();
				event.stopPropagation();
			});
			$(select).on('click','', function(event) {
				event.stopPropagation();
				// 关闭所有已打开的窗口
				$(form.el).find('.kb-editform-select').each(function(index, el) {
					if($(this).hasClass('kb-openselect')){
						$(this).find('.kb-icon-arrow-down').css({
							'opacity': 0,
							'visibility': 'hidden'
						});
						$(this).find('.kb-icon-min-close').css({
							'opacity': 1,
							'visibility': 'visible'
						});
						$(this).removeClass('kb-openselect');
					}
				});
				if($(this).hasClass('kb-disabled')){
					return false;
				}
				$(this).toggleClass('kb-openselect');
				var open = false;
				if($(select).hasClass('kb-openselect')){
					open = true;
				}

				if(open){
					$(this).find('.kb-icon-min-close').css({
						'opacity': 0,
						'visibility': 'hidden'
					});
					$(this).find('.kb-icon-arrow-down').css({
						'opacity': 1,
						'visibility': 'visible',
						'transform': 'rotate(180deg)'
					});
					// 选择框定位
					$(select).attr('style','');
					$(select).find('.kb-select-scroll').attr('style','');
					if($(window).height() - $(select).find('.kb-select-scroll').offset().top <= 10 && $(select).find('.kb-select-scroll').offset().top >= $(select).find('.kb-select-scroll').outerHeight()){
						var t = $(select).find('.kb-select-scroll').outerHeight() - $(select).outerHeight();
						$(select).find('.kb-select-scroll').css({
							top: 0 - t,
							height:h
						});
					}else if($(window).height() <= $(select).find('.kb-select-scroll').outerHeight() + $(select).find('.kb-select-scroll').offset().top){
						var w = $(select).find('.kb-select').outerWidth()+5,l = $(select).find('.kb-select-scroll').offset().left+5,h = $(select).find('.kb-select-scroll').outerHeight();
						if(h > $(window).height()){
							h = $(window).height() - 10;
						}
						var t = $(select).find('.kb-select').offset().top - $(select).find('.kb-select-scroll').outerHeight() - 7;
						if(t < 0){
							t = 0;
						}
						$(select).find('.kb-select-scroll').css({
							position: 'fixed',
							top: t,
							left : l,
							width : w,
							height: h
						});
					}
					if($(select).find('.kb-select-scroll li').length == 0){
						if($(select).find('.kb-notfound').length == 0){
							$(select).find('ul').before('<span class="kb-notfound">Not Found</span>');
						}
					}
					if(ele.options.search){
						$(select).find('.kb-searchbox').focus();
					}
				}else{
					$(this).find('.kb-icon-arrow-down').css({
						'transform': 'rotate(0deg)'
					});
					if($(this).find('.kb-select').html() != ''){
						$(select).find('.kb-icon-arrow-down').css({
							'opacity': 0,
							'visibility': 'hidden'
						});
						$(select).find('.kb-icon-min-close').css({
							'opacity': 1,
							'visibility': 'visible'
						});
					}
				}
			});
			$(select).on('click', '.kb-select-scroll li', function(event) {
				event.stopPropagation();
				var title = $(this).data('title');
				if(title == undefined){
					_title = $(this);
					$(_title).find('span').remove();
					title = $(_title).html();
				}
				$(select).find('.kb-select-scroll li').each(function(index, el) {
					$(this).removeClass('active');	
				});
				$(this).addClass('active');	
				$(select).find('.kb-select').html(title);
				$(select).find('.kb-icon-arrow-down').css({
					'opacity': 0,
					'visibility': 'hidden'
				});
				$(select).find('.kb-icon-min-close').css({
					'opacity': 1,
					'visibility': 'visible'
				});
				$(select).removeClass('kb-openselect');
				// 点击回调
				if(ele.options.callback.kbcb_select != undefined && ele.options.callback.kbcb_select != ''){
					ele.options.callback.kbcb_select($(this),$(select));
				}
			});
			$(select).on('click', '.kb-icon-min-close', function(event) {
				event.stopPropagation();
				$(select).find('.kb-icon-min-close').css({
					'opacity': 0,
					'visibility': 'hidden'
				});
				$(select).find('.kb-icon-arrow-down').css({
					'opacity': 1,
					'visibility': 'visible',
					'transform': 'rotate(0deg)'
				});
				$(select).find('.kb-select').html('');
				// Clear回调
				if(ele.options.callback.kbcb_clear != undefined && ele.options.callback.kbcb_clear != ''){
					ele.options.callback.kbcb_clear($(this),$(select));
				}
				return false;
			});
			// 搜索事件
			if(ele.options.search){
				$(select).on('propertychange input', '.kb-searchbox', function(event) {
					event.preventDefault();
					var searchtext = $(this).val();
					var n = 0;
					$(select).find('li').each(function(index, el) {
						$(this).hide();
						if($(this).html().indexOf(searchtext) != -1){
							$(this).show();
							n++;
						}
					});
					if(n == 0){
						if($(select).find('.kb-notfound').length == 0){
							$(select).find('.kb-searchbox').after('<span class="kb-notfound">Not Found</span>');
						}
					}else{
						if($(select).find('.kb-notfound').length != 0){
							$(select).find('.kb-notfound').remove();
						}
					}
				});
			}
			// 初始化
			if($(select).data('active') != undefined){
				$(select).find('.kb-select-scroll').find('li').eq($(select).data('active')).click();
			}
		},
		// 重新绑定事件
		_ReBindInputGroup:function(ele){
			$(ele).find('.kb-inputbtn').each(function(index, el) {
				if(index != 0){
					// 移除之前绑定过的事件
					$(this).off();
					$(this).on('click', '', function(event) {
						$(this).prev('.kb-inputitem').remove();
						$(this).remove();
					});
				}
			});
		},
		_GetRandomString:function(len) {  
		    len = len || 16;  
		    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1  
		    var maxPos = $chars.length;  
		    var pwd = '';  
		    for (i = 0; i < len; i++) {  
		        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));  
		    }  
		    return pwd;  
		}
	}
	window.KouBeiEditForm = KouBeiEditForm;
})(window, document, Math);