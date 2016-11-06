/*! 口碑插件&Table Form 元素 v0.0.1 ~ (c) 2016-2016 @快叫我韩大人 ~ http://weibo.com/hoythan */
!(function (window, document, Math) {
	var KouBeiTableForm = function(el,options){
		this.el = el;
	    this.defaults = {
	        'anime' : true,
	        'callback' : {
	        	'kbcb_after' : '',
	        	'kbcb_before' : '',
	        	'kbcb_clicktab' : ''
	        }
	    };
	    this.getform = new Array();
	    /* 元素存储 */
	    this.ele = new Array();
	    /* 合并参数 */
	    this.options = $.extend({},this.defaults,options);
	}
	KouBeiTableForm.prototype = {
		Start:function(){
			// console.log(this.ele.select);
		},
		/* 添加重置元素 */
		Reset:function(element){
			var form = this;
			if(element != null){
				$(form.ele).each(function(index, el) {
					if($(form.el).find(element).is(el)){
						form._Reset(el);
					}
				});
			}else{
				$(form.ele).each(function(index, el) {
					form._Reset(el);
				});
			}
		},
		_Reset:function(el){
			$(el).html($.data(el, 'reset_html'));
			var ele = $(this.el).find(el);
			ele.options = $.data(el, 'reset_option');
			if(ele.options.type == 'input'){
				this._ResetInput(ele);
			}else if(ele.options.type == 'select'){
				// 需要做一个清空 active 的步骤
				var select = $(this.el).find(ele);
				$(select).data('active',$(select).data('default-active'));
				this._ResetSelect(ele);
			}
		},
		/* 添加各类元素 */
		AddInput:function(ele,options){
			var defaulopt = {
		    };
		    ele.options = $.extend({},defaulopt,options);
		    ele.options.type = 'input';
			if($(this.el).find(ele).length == 0){
				return false;
			}
			this.ele.push(ele);
			$.data(ele, 'reset_option', ele.options);
			$.data(ele, 'reset_html', $(ele).html());
			this._ResetInput(ele);
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
			this.ele.push(ele);
			$.data(ele, 'reset_option', ele.options);
			$.data(ele, 'reset_html', $(ele).html());
			this._ResetSelect(ele);
		},
		_ResetInput:function(ele){
			var input = $(this.el).find(ele);
			$(input).off();
			$(input).on('propertychange input', '.kb-input', function(event) {
				$(this).attr('value',$(this).val());
			});
		},
		_ResetSelect:function(ele){
			var form = this;
			var select = $(this.el).find(ele);
			$(select).off();
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
				var thisele = $(this);
				event.stopPropagation();
				// 关闭所有已打开的窗口
				$(form.el).find('.kb-item-select').each(function(index, el) {
					if($(this).hasClass('kb-openselect')){
						if($(this).html() != $(thisele).html()){
							$(this).removeClass('kb-openselect');

							$(this).find('.kb-icon-arrow-down').css({
								'transform': 'rotate(0deg)'
							});
							if($(this).find('.kb-select').html() != ''){
								$(this).find('.kb-icon-arrow-down').css({
									'opacity': 0,
									'visibility': 'hidden'
								});
								$(this).find('.kb-icon-min-close').css({
									'opacity': 1,
									'visibility': 'visible'
								});
							}
						}
					}
				});

				if($(this).hasClass('kb-disabled')){
					return false;
				}

				var open = false;
				$(this).toggleClass('kb-openselect');
				if($(this).hasClass('kb-openselect')){
					open = true;
				}

				if(open){
					$(document).one('click', function(event) {
						if($(select).hasClass('kb-openselect')){
							// 关闭所有已打开的窗口
							$(form.el).find('.kb-item-select').each(function(index, el) {
								if($(this).hasClass('kb-openselect')){
									$(this).removeClass('kb-openselect');

									$(this).find('.kb-icon-arrow-down').css({
										'transform': 'rotate(0deg)'
									});
									if($(this).find('.kb-select').html() != ''){
										$(this).find('.kb-icon-arrow-down').css({
											'opacity': 0,
											'visibility': 'hidden'
										});
										$(this).find('.kb-icon-min-close').css({
											'opacity': 1,
											'visibility': 'visible'
										});
									}
								}
							});
						}
					});

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
						var w = $(select).find('.kb-select').outerWidth(),l = $(select).find('.kb-select-scroll').offset().left,h = $(select).find('.kb-select-scroll').outerHeight();
						if(h > $(window).height()){
							h = $(window).height() + 10;
						}
						var t = $(select).find('.kb-select').offset().top - $(select).find('.kb-select-scroll').outerHeight();
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
				$(select).find('.kb-select-scroll li').each(function(index, el) {
					$(this).removeClass('active');
				});

				// 初始化(归零)
				if($(select).data('default-active') != undefined){
					if($(select).data('default-active') > 0){
						$(select).find('.kb-select-scroll').find('li').eq(parseInt($(select).data('default-active')) - 1).click();
					}
				}else{
					$(select).data('active','0');
				}

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
			var test = '['+$(select).data('active')+']'; // 上这个验证比较容易一点?
			if($(select).data('active') != undefined && test != '[]'){
				if($(select).data('active') > 0){
					$(select).find('.kb-select-scroll').find('li').eq(parseInt($(select).data('active')) - 1).click();
				}
			}else if($(select).data('default-active') != undefined){
				if($(select).data('default-active') > 0){
					$(select).find('.kb-select-scroll').find('li').eq(parseInt($(select).data('default-active')) - 1).click();
				}
			}
		},
		GetForm:function(element){
			var form = this;
			form.getform = new Array();
			if(element != null){
				$(form.ele).each(function(index, el) {
					if($(form.el).find(element).is(el)){
						form._GetForm(el);
					}
				});
			}else{
				$(form.ele).each(function(index, el) {
					form._SearchForm(el);
				});
			}
			return form._GetForm();
		},
		_SearchForm:function(el){
			var ele = $(this.el).find(el);
			var val = '';
			ele.options = $.data(el, 'reset_option');
			if(ele.options.type == 'input'){
				val = $(this.el).find(el).find('.kb-input');
			}else if(ele.options.type == 'select'){
				// val = $(this.el).find(el);
				val = $(this.el).find(el).find('.kb-select-scroll li.active');
			}
			if(val == undefined || val == '' || val.length == 0){
				val = undefined;
			}
			this.getform.push(val);
		},
		_GetForm:function(){
			return this.getform;
		}
	}
	// <span class="kb-notfound">Not Found</span>
	window.KouBeiTableForm = KouBeiTableForm;
})(window, document, Math);