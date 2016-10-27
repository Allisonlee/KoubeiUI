/*! 口碑插件&Table IMG 弹出框 元素 v0.0.1 ~ (c) 2016-2016 @快叫我韩大人 ~ http://weibo.com/hoythan */
!(function (window, document, Math) {
	var KouBeiImageShow = function(el,options){
		this.el = el;
	    /* 合并参数 */
	    this.options = $.extend({},this.defaults,options);
	    this.Init();
	}
	KouBeiImageShow.prototype = {
		Init:function(){
			var form = this;
			$(form.el).find('.kb-imageshow').each(function(index, el) {
				$(this).on('click', '', function(event) {
					if($('.kb-imageshow-box').length != 0){
						$('.kb-imageshow-box').each(function(index, el) {
							$(this).remove();
						});
						$('.kb-imageshow').each(function(index, el) {
							$(this).removeClass('kb-imageopen');
						});
					}
					event.preventDefault();
					event.stopPropagation();
					$(this).toggleClass('kb-imageopen');
					var open = false;
					if($(this).hasClass('kb-imageopen')){
						open = true;
					}

					if(open){
						var src = $(this).data('src');
						if(src != ''){
							var tmpclass = 'kb-imageshow-box_'+form._GetRandomString();
							$('body').append('<div class="kb-imageshow-box '+tmpclass+' "><img src="'+src+'"></div>');
							var boxparent = $(this);
							var box = $('.'+tmpclass),left = $(boxparent).outerWidth() + $(boxparent).offset().left,top = 0;
							if($(boxparent).offset().left + $(box).outerWidth() > $(window).width()){
								left = $(boxparent).offset().left - $(box).outerWidth();
								if(left < 0){
									left = 0;
								}
							}
							$(box).css({
								'left': left,
								'top' : $(boxparent).outerHeight() + $(boxparent).offset().top
							});
							
							$(window).one('click', function(event) {
								$(box).remove();
								$(boxparent).removeClass('kb-imageopen');
							});
						}
					}else{
						$(form.el).find('.kb-imageshow-box').remove();
					}
				});
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
	window.KouBeiImageShow = KouBeiImageShow;
})(window, document, Math);