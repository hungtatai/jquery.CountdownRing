/*
 * Copyright 2012, Honda Dai (http://coazure-code.blogspot.com)
 * Dual licensed under the MIT licenses.
 *
 * https://github.com/HondaDai/CountdownRing
 */


;(function($) {
	
	var safeNum = function(n, def) {
		n = parseInt(n, 10);
		return isNaN(n)?def:n;
	}
	
	$.fn.CountdownRing = function(p0, p1, p2, p3) {
		var cd = $.noop();
		switch(arguments.length){
			case 0:
				cd = countdown($(this), 60, 60, $.noop(), {});
				break;
			case 1:
				p0 = safeNum(p0, 60);
				cd = countdown($(this), p0, p0, $.noop(), {});
				break;
			case 2:
				p0 = safeNum(p0, 60);
				if ( $.isFunction(p1) )
					cd = countdown($(this), p0, p0, p1, {});
				else {
					p1 = Math.max(p0, safeNum(p1, 0) );
					cd = countdown($(this), p0, p1, $.noop(), {});
				}
				break;
			case 3:
				p0 = safeNum(p0, 60);
				if ( $.isFunction(p2) ) {
					p1 = Math.max(p0, safeNum(p1, 0) );
					cd = countdown($(this), p0, p1, p2, {});
				}
				else {
					p1 = Math.max(p0, safeNum(p1, 0) );
					cd = countdown($(this), p0, p1, $.noop(), p2);
				}
				break;
			case 4:
				p0 = safeNum(p0, 60);
				p1 = Math.max(p0, safeNum(p1, 0) );
				cd = countdown($(this), p0, p1, p2, p3);
				break;
		}
		
		
		return cd;
	}
	
	
	var countdown = function(elem, time_value, total_time, onSuccss, options) {
			
			var stopflag = false;
			var init = true;
			
			options = $.extend(true, {
				R : 'auto',//155,
				margin : 20,
				fontSize: 'auto',
				outer: {color: "#2276CB", width: 10}, //outer stroke
				inner: {color: "#D2E0ED", width: 10}, //inner stroke
				mark:  {color: "#DDDDDD", width: 1}, //mask stroke
				sidelen: 'auto', //square area (sidelen, sidelen) for build countdown
				center : 'auto',  //center point (center, center)
				autostart: true
			}, options);
			
			
			var outerStroke = {
				"stroke": options.outer.color||"#2276CB", 
				"stroke-width": options.outer.width||10
			};
			var innerStroke = {
				"stroke": options.inner.color||"#D2E0ED", 
				"stroke-width": options.inner.width||10
			};
			var markStroke = {
				"stroke": options.mark.color||"#DDDDDD", 
				"stroke-width": options.mark.width||1
			};
			
			//sidelen
			options.sidelen = (options.sidelen=='auto')?Math.min($(elem).height(), $(elem).width()):options.sidelen;
			//center
			options.center = (options.center=='auto')?options.sidelen*0.5:options.center;
			//R
			options.R = (options.R=='auto')?options.sidelen*0.5 - options.margin*2:options.R;
			//fontSize
			options.fontSize = (options.fontSize=='auto')?options.R*0.5:options.fontSize;
			
			var raph = Raphael($(elem).get(0), options.sidelen, options.sidelen);
			
			raph.customAttributes.arc = function (value, total, R, center) {
			
				R = isNaN(R)?options.R:R;
				center = isNaN(center)?options.center:center;
				
				var alpha = 360 / total * value,
					a = (90 - alpha) * Math.PI / 180,
					x = center + R * Math.cos(a),
					y = center - R * Math.sin(a),
					path;

				if (total == value) {
					path = [["M", center, center - R], ["A", R, R, 0, 1, 1, center - 0.001, center - R]];
				} else {
					path = [["M", center, center - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
				}

				return {path: path};
			};

			

		function initClock(value, total, R, center, hand) {
			var amount = value <= 0 ? 0.001 : value;
			
		}
			
		function updateClock(value, total, R, center, hand) {
			var amount = value <= 0 ? 0.001 : value;

			if (init) {
				hand.animate({arc: [amount, total, R, center, center]}, 0, ">");
			} else {
				if (value <= 0 || value == total) {
					hand.animate({arc: [amount, total, R, center, center]}, 750, ">", function () {
						hand.attr({arc: [amount, total, R, center, center]});
					});
					
				} else {
					hand.animate({arc: [amount, total, R, center, center]}, 750, ">");
				}
			}
		}
		
		time_text = raph.text(options.center,options.center,'').attr({
			'font-size': options.fontSize, 
			'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
			'font-weight': 'bold',
			'letter-spacing': 2
		});
		function updateText(text) {
		
			time_text.attr({ text: text });
		}

		
		
		var outer = raph.path().attr(outerStroke).attr({arc: [0.01, 60, options.R]});
		var inner = raph.path().attr(innerStroke).attr({arc: [0.01, 60, options.R - 20]});
		
		raph.circle(options.center, options.center, options.R).attr(markStroke);
		
		var start = function () {
			if( stopflag == true ) return;
			
			init = false;
				
			
			if(time_value == total_time)
				;//initClock(time_value, total_time, options.R + options.margin, options.center, outer);
			updateClock(time_value, total_time, options.R + options.margin, options.center, outer);
			updateClock(time_value, total_time, options.R - options.margin, options.center, inner);
			updateText(time_value)
			
			if (time_value > 0 ) {
				setTimeout(arguments.callee, 1000);
				time_value -= 1;
			}
			else {
				if ($.isFunction(onSuccss)) {
					c = function(){ onSuccss.call( $(elem) ); }
					setTimeout("c()", 1000);
				}
				
			}
			
		}
		
		if(options.autostart == true)
			start();

		var o = {
			start: function() {
				stopflag = false;
				start();
			},
			stop: function() {
				stopflag = true;
			}
		}
		return o;
		
};
})(jQuery);