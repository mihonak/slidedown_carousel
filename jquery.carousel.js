(function($){
	$.fn.carousel= function(options){

		var settings = {
			speed:500,
			time:5000
		};

		return this.each(function(){
			if(options){
				$.extend(settings,options);
			}

			var lists = $('li',$(this));
			var listHeight = $(lists[0]).height();
			var negMargin = listHeight*(lists.length-1);

			$(this).css({
				height:listHeight+'px',
				overflow:'hidden'
			});
			$('ul',$(this)).css('marginTop','-'+negMargin+'px');

			var sorted = '';
			for(i=lists.length-1;i>=0;i--){
				sorted += '<li>'+$(lists[i]).html()+'</li>';
			}
			$('ul',$(this)).html(sorted);

			var self = $(this);
			function slidedown(){console.log(self);
				$('ul',self).animate({
					marginTop:'-'+(negMargin-listHeight)+'px'
				},settings.speed,function(){
					$('li:last-child',self).clone().prependTo($('ul',self)).end().end().remove();
					$('ul',self).css('marginTop','-'+negMargin+'px');
				});
			}

			var interval;
			function start(){
				interval = setInterval(slidedown,settings.time);
			};
			start();

			$(this).mouseover(function(){
				clearInterval(interval);
			});
			$(this).mouseout(function(){
				start();
			});

		});

	};
})(jQuery);