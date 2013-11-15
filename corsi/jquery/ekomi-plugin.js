//Daniele - Ekomi Plugin
/**
 * Ekomi Plugin
 * Author: Daniele Covallero
 * Version: 1.00
 * Used: http://www.virtualbazar.it/modifiche/widget_ekomi/ekomi_plugin.js
 */

(function($){
	$.fn.ekomi = function(settings) {
		var opts = $.extend({ }, $.fn.ekomi.defaults, settings);

		return this.each(function(settings){
           var options = $.extend({}, opts, $(this).data());
           var $el = $(this), id = options.page;

	        var previous_page = function() {
		    	if(options.page > 1) {
		    		id--; options.page--;
				 	nascondi_val();
					$('.navigate', $el).css({'text-decoration' : 'none'});
					$('#navigation' + id, $el).css({'text-decoration' : 'underline'});
				}
		    }
		    var next_page = function() {
		    	if($('#navigation' + (+id + 1), $el).text().length > 0) {
		    		id++; options.page++;
				 	nascondi_val();
					$('.navigate', $el).css({'text-decoration' : 'none'});
					$('#navigation' + id, $el).css({'text-decoration' : 'underline'});
				}
		    }
		    var navigate = function(nav) {
		    	var page_dates = nav.attr('id').split('navigation');
		    	id = page_dates[1]; options.page = id;
		    	$('.navigate', $el).css({'text-decoration' : 'none'})
		    	$('#navigation' + id, $el).css({'text-decoration' : 'underline'});
		    	nascondi_val();
		    }
		    var nascondi_val = function() {
		    	var start = (options.page * options.n_visualizza) - (options.n_visualizza -1);
				for(var i=1;  i <= options.limit;  i++)
					if((i >= start) && (i < (start + options.n_visualizza)) && $('#valutation'+ i, $el).hasClass('hidden'))
						$('#valutation'+ i, $el).removeClass('hidden');
					else if(!$('#valutation'+ i, $el).hasClass('hidden'))
						$('#valutation'+ i, $el).addClass('hidden');
		    }

		    $('#previous_page', $el).click(previous_page);
		    $('#next_page', $el).click(next_page);
		    $('.navigate', $el).click(function() { navigate($(this)) });
		    navigate($('#navigation' + id, $el));
        });
	}

	// plugin defaults
	$.fn.ekomi.defaults = {
		n_visualizza: 3,
	    page: 1,
	    limit: 50
	}
})(jQuery);