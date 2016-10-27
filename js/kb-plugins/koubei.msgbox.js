/*! 口碑插件&MsgBox v0.0.1 ~ (c) 2016-2016 @快叫我韩大人 ~ http://weibo.com/hoythan */
!(function (window, document, Math) {
	var KoubeiMsgBox = function(options){
	    this.defaults = {
			'id': 'kb-msgbox-html',
			'type' : 'default', //question 问题
			'autoclose': false,
			'colsedelay' : 3000,
			'btn' : '1',// 0 = none ; 1 = yes; 2 = yes & on;
			'btntext' : {
				'yes' : '确定',
				'no' : '取消'
			},
			'callback':{
				'yes': '',
				'no' : '',
				'before' : '',
				'after' : ''
			},
			'content': {
				'icon' : '',
				'title' : '',
				'subtitle' : ''
			}
	    };
	    /* 合并参数 */
	    this.options = $.extend({},this.defaults,options);
	    $('#'+this.options.id).remove();
	    this._Open(this.options);
	}
	KoubeiMsgBox.prototype = {
		_Open:function(){
			var ele = this;
			$('body').append('<div id="'+this.options.id+'" class="kb-msgbox kb-msgbox-'+this.options.type+'"><div class="kb-table"><div class="kb-call"><div class="kb-box"></div></div></div></div>');
			var Msg = $('#'+this.options.id),
			MsgBox 	= $(Msg).find('.kb-box');

			if(this.options.btn == 1 && this.options.type != 'loading'){
				MsgBox.append('<div class="kb-btngroup"><a class="kb-btn kb-btn-primary" href="javascript:;">'+this.options.btntext.yes+'</a></div>');

				$(Msg).on('click', '.kb-btn', function(event) {
					if(ele.options.callback.yes != undefined && ele.options.callback.yes != ''){
						ele.options.callback.yes();
					}
					$(Msg).remove();
				});
			}else if(this.options.btn == 2){
				MsgBox.append('<div class="kb-btngroup"><a class="kb-btn kb-btn-no kb-btn-ghost" href="javascript:;">'+this.options.btntext.no+'</a><a class="kb-btn kb-btn-yes kb-btn-primary" href="javascript:;">'+this.options.btntext.yes+'</a></div>');
				
				$(Msg).on('click', '.kb-btn-no', function(event) {
					if(ele.options.callback.no != undefined && ele.options.callback.no != ''){
						ele.options.callback.no();
					}
					$(Msg).remove();
				});
				$(Msg).on('click', '.kb-btn-yes', function(event) {
					if(ele.options.callback.yes != undefined && ele.options.callback.yes != ''){
						ele.options.callback.yes();
					}
					$(Msg).remove();
				});
			}
			var icon = 'kb-icon-tishi';
			if(this.options.type == 'question'){
				icon = 'kb-icon-bangzhu';
			}else if(this.options.type == 'warning'){
				icon = 'kb-icon-jingshi';
			}else if(this.options.type == 'loading'){
				icon = 'kb-icon-dengdai';
			}
			$(MsgBox).prepend('<div class="kb-icon"><i class="'+icon+'"></i></div><div class="kb-contant"><h2>'+this.options.content.title+'</h2><p>'+this.options.content.subtitle+'</p></div>');
			$(Msg).on('click','.kb-box', function(event) {
				event.preventDefault();
				event.stopPropagation();
			});
			$(Msg).on('click', '', function(event) {
				if(ele.options.type != 'loading'){
					$(this).off();
					$(this).remove();
				}
			});
		},
		Close:function(){
			$('#'+this.options.id).remove();
		}
	}
	window.KoubeiMsgBox = KoubeiMsgBox;
})(window, document, Math);