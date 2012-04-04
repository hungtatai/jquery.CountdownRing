Countdown Ring
==============

Easy to build fancy CountDown Ring on your web


Required
--------

* [jquery](http://jquery.com/) - version 1.7.1 or lastest
* [Raphaël](http://raphaeljs.com/) - version 2.0.2 or lastest


Usage
-----

Just call **CountdownRing**

	$('#holder').CountdownRing();



###Call CountdownRing Method
	
* `$(elem).CountdownRing();`
* `$(elem).CountdownRing(time_value);`
* `$(elem).CountdownRing(time_value, total_time);`
* `$(elem).CountdownRing(time_value, callback);`
* `$(elem).CountdownRing(time_value, total_time, callback);`
* `$(elem).CountdownRing(time_value, total_time, options);`
* `$(elem).CountdownRing(time_value, total_time, callback, options);`	
	
	
### Sample HTML
	<body>
        <div id="holder"></div>
    </body>

### Sample CSS

	#holder {
		position: absolute;
		left:100px;
		right: 100px;
		height: 300px;
		width: 300px;
		margin: 0px;
		padding: 0px
	}
	
### Sample Script 1

	$(function() {
		$('#holder').CountdownRing(); //default 60 seconds countdown
	});


[Demo1](http://countdownring.herokuapp.com/demo1.html)

### Sample Script 2

	$(function() {
		$('#holder').CountdownRing(10); //10 seconds countdown
	});

[Demo2](http://countdownring.herokuapp.com/demo2.html)

### Sample Script 3

	$(function() {
		$('#holder').CountdownRing(45, 60); //45 seconds countdown, total is 60 seconds
	});

[Demo3](http://countdownring.herokuapp.com/demo3.html)

### Sample Script 4

	$(function() {
		$('#holder').CountdownRing(10, 60, function(){
			alert('success');   //set completion activity for countdown
		}); 
	});

[Demo4](http://countdownring.herokuapp.com/demo4.html)




Documentation
-------------

**Argument**

* **time_value** : countdown time
* **total_time** : total countdown time
* **callback** : completion activity for countdown
* **options** : additional configuration
	* **R**: ring's radius, 'auto' means depending min(width, height) of element  *- default 'auto'*
	* **margin**: margin between outer ring and inner ring *- default 20*
	* **fontSize**: countdown text's font size *- default 'auto'*
	* **outer**: outer ring's stroke *- default {color: "#2276CB", width: 10}*
	* **inner**: inner ring's stroke *- default {color: "#D2E0ED", width: 10}*
	* **mark**:  mask ring's stroke *- default {color: "#DDDDDD", width: 1}*
	* **sidelen**: square area (sidelen, sidelen) for build countdown *- default 'auto'*
	* **center**: center point (center, center) *- default 'auto'*
	* **autostart**: auto start countdown *- default true*



Advanced usage
--------------

### Sample Html

    <body>
		<h2 class="ready"> Ready... </h2>
		<h1 class="go"> GO!! </h1>
        <div id="holder"></div>
		<button id="start">start</button>
		<button id="stop">stop</button>
    </body>	
	
### Sample CSS

	#holder {
		position: absolute;
		left:100px;
		right: 100px;
		height: 400px;
		width: 400px;
		margin: 0px;
		padding: 0px
	}
	.ready {
		position: absolute;
		display: none;
		font-size: 60px;
		color: gray;
	}
	.go {
		position: absolute;
		display: none;
		font-size: 90px;
		color: black;
	}

### Sample Script

	var options = {
		'outer': {
			color: 'gray',
			width: 12
		},
		'inner': {
			color: 'orange',
			width: 8
		},
		margin: 18,
		autostart: false
	};
	var callback = function(){
		$('#start, #stop').hide();
		$(this).fadeOut('middle', function(){
			$('.ready').fadeIn('slow', function(){
				$('.ready').hide();
				$('.go').fadeIn(1000);
			});
		});
	};

	var cdr = $('#holder').CountdownRing(10, 10, callback, options);
		
	$('#start').click(function(){
		cdr.start();
	});
	$('#stop').click(function(){
		cdr.stop();
	});

	$('#holder').position({
		of: $(window),
		my: "center center",
		at: "center center",
		offset: "0px -50px"
	});
	$('.ready').position({
		of: $(window),
		my: "center center",
		at: "center center",
		offset: "0px -60px"
	});
	$('.go').position({
		of: $(window),
		my: "center center",
		at: "center center",
		offset: "0px -60px"
	});
	
	
[Demo5](http://countdownring.herokuapp.com/demo5.html)	

License - The MIT License
-------

Copyright © 2012 Honda Dai

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 「Software」), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 「AS IS」, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE