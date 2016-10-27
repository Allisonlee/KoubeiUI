/*! 口碑插件&Table v0.0.1 ~ (c) 2016-2016 @快叫我韩大人 ~ http://weibo.com/hoythan */
!(function (window, document, Math) {
	var KoubeiTable = function(el,options){
		this.el = el;
	    this.defaults = {

	    };
	    /* 合并参数 */
	    this.options = $.extend({},this.defaults,options);
	    this.Init();
	}
	KoubeiTable.prototype = {
		Init:function(){
			var form = this.el;
			$(form).off();
			// 初始化 input
			$(this.el).find('.kb-check-input').each(function(index, el) {
				var checked = '';
				var checkall = false;
				var touch = true,
					touch_class = '';
				if($(this).is(':checked')){
					checked = 'kb-checkbox-checked';
				}
				if($(this).hasClass('kb-check-donttouch')){
					touch = false;
					touch_class = 'kb-check-donttouch';
				}
				if($(this).hasClass('kb-check-all')){
					checkall = true;
				}
				$(this).before('<span class="kb-checkbox '+checked+' '+touch_class+'"><span class="kb-checkbox-inner"></span></span>');
				$(this).prev().append($(this));

				$(form).find($(this).parent()).on('click', '', function(event) {
					if(touch === false){
						return false;
					}
					$(this).toggleClass('kb-checkbox-checked');
					if($(this).hasClass('kb-checkbox-checked')){
						$(this).find('.kb-check-input').attr('checked','checked');
					}else{
						$(this).find('.kb-check-input').removeAttr('checked');
					}

					if(checkall){
						if($(this).hasClass('kb-checkbox-checked')){
							$(form).find('.kb-checkbox').each(function(index, el) {
								if(!$(this).hasClass('kb-check-donttouch')){
									$(this).addClass('kb-checkbox-checked');
									$(this).find('.kb-check-input').attr('checked','checked');
								}
							});
						}else{
							$(form).find('.kb-checkbox').each(function(index, el) {
								if(!$(this).hasClass('kb-check-donttouch')){
									$(this).removeClass('kb-checkbox-checked');
									$(this).find('.kb-check-input').removeAttr('checked');
								}
							});
						}

					}
				});
			});
			// 判断是否需要全部选中(不包括禁止选中项)
			if($(form).find('.kb-check-all').is(':checked')){
				$(form).find('.kb-checkbox').each(function(index, el) {
					if(!$(this).hasClass('kb-check-donttouch')){
						$(this).addClass('kb-checkbox-checked');
						$(this).find('.kb-check-input').attr('checked','checked');
					}
				});
			}
			// 初始化下拉选择
			$(form).find('.kb-table-nav').each(function(index, el) {
				if($(this).find('ul').length != 0){
					$(this).find('ul').each(function(index, el) {
						$(this).parent('li').addClass('kb-dropdown');
						$(this).parent('li').on('click','',function(event) {
							// event.preventDefault();
							// event.stopPropagation();
							var el = $(this);
							$(this).toggleClass('kb-open-dropdown');
							if($(this).hasClass('kb-open-dropdown')){
								$(document).find('.kb-open-dropdown').removeClass('kb-open-dropdown');
								$(this).addClass('kb-open-dropdown');
								var ul = $(this).children('ul'),h = 0,lh;
								lh = $(this).outerHeight();
								$(ul).children('li').each(function(index, el) {
									h = $(this).outerHeight() + h + 14;
								});
								$(ul).attr('style','');
								$(ul).removeClass('kb-scroll');
								if(h > 200){
									$(ul).addClass('kb-scroll');
									h = 200;
								}
								if($(ul).outerHeight() + $(ul).offset().top >= $(window).height()){
									$(ul).css({
										'margin-top': 0 - h - lh - 5
									});
								}

								if($(ul).offset().left + $(ul).outerWidth() + 20 >= $(window).width()){
									$(ul).css({
										'margin-left': 0 - $(ul).outerWidth() + $(this).outerWidth()
									});
								}
								$(document).click(function(e){
									var colse = true;
									$(el).find('a').each(function(index, el) {
										if($(this)[0] == $(e.target)[0]){
											colse = false;
										}
									});
									if(colse){
										$(this).off();
										$(el).removeClass('kb-open-dropdown');
									}
									// console.log($(e.target));
								});
								// $(document).one('click','', function(event) {
								// 	
								// });
							}
						});
					});
				}
			});
		}
	}
	window.KoubeiTable = KoubeiTable;
})(window, document, Math);