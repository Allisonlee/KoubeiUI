/*! 口碑插件&Tips v0.0.1 ~ (c) 2016-2016 @快叫我韩大人 ~ http://weibo.com/hoythan */
$(document).ready(function() {
	// 将所有的 TIPS 都绑定事件
	if($('body').find('.kb-tips').length > 0){
		$('body').find('.kb-tips').each(function(index, el){
			var el = $(this);
			$(this).append('<div class="kb-close"><i class="kb-icon-miniclose"></i></div>');
			$(this).one('click', '.kb-close', function(event) {
				$(el).addClass('kb-tips-close');
				setTimeout(function () {
					$(el).remove();
	    		},200);
			});
		});
	}
});