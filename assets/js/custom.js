var screensize = $(window).width();

$(window).on('load',function() {
	$(".se-pre-con").fadeOut("slow");;
});


$(function(){
	$('.selectpicker').selectpicker();
});

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
	'total': t,
	'days': days,
	'hours': hours,
	'minutes': minutes,
	'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
	var t = getTimeRemaining(endtime);

	daysSpan.innerHTML = t.days;
	hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
	minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
	secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

	if (t.total <= 0) {
	  clearInterval(timeinterval);
	}
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 115 * 24 * 60 * 60 * 1000);
initializeClock('clockdiv', deadline);

$(document).ready(function(){
	$(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("collapse show");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $("button.navbar-toggle").click();
        }
    });
	if($('.slider_init').length > 0){
		$('.slider_init').slick({
			dots: false,
			arrows: true,  
			nextArrow: '<img class="slick-next" src="assets/images/next.png" alt="Next" />',
			prevArrow: '<img class="slick-prev" src="assets/images/prev.png" alt="Previous" />',

		});
	}
    $('.customer-logos').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 2
            }
        }]
    });
});

	$(document).ready(function() {
		$(".slider-youtube iframe").each(function (idx) {
		$(this).addClass("data-idx-" + idx).data("idx", idx);
	});

	function getPlayer (iframe, onPlayerReady, clonned) {
		var $iframe = $(iframe);
		if ($iframe.data((clonned ? "clonned-" : "") + "player")) {
			var isReady = $iframe.data((clonned ? "clonned-" : "") + "player-ready");
		  if (isReady) {
			onPlayerReady && onPlayerReady($iframe.data((clonned ? "clonned-" : "") + "player"));
		  }        	
			return player;
		}
		else {
			var player = new YT.Player($iframe.get(0), {
			events: {
			  'onReady': function () {
				$iframe.data((clonned ? "clonned-" : "") + "player-ready", true);
				onPlayerReady && onPlayerReady(player);
			  }
			}
		  });        
		  $iframe.data((clonned ? "clonned-" : "") + "player", player);
		  return player;
		}    		
	}
	
	//on first load, play the video
	$(".slider-youtube").on('init', function(event, slick, currentSlide) {
		var currentSlide, player, command;
		currentSlide = $(slick.$slider).find(".slick-current");        
		getPlayer(currentSlide.find("iframe"), function (player) {
			player.playVideo();
		});
	});

	//when new slide displays, play the video
	$(".slider-youtube").on("afterChange", function(event, slick) {
		var currentSlide;
		currentSlide = $(slick.$slider).find(".slick-current");
		getPlayer(currentSlide.find("iframe"), function (player) {
			player.playVideo();
		});
	});
	
	function updateClonnedFrames () {
		frames = $(".slider-youtube").find(".slick-slide").not(".slick-cloned").find("iframe");
	  	frames.each(function () {
			var frame = $(this);
			var idx = frame.data("idx");
			clonedFrames = $(".slider-youtube").find(".slick-cloned .data-idx-" + idx);
			console.log("clonedFrames", frame, idx, clonedFrames);
			clonedFrames.each(function () {
				var clonnedFrame = this;
				getPlayer(frame[0], function (player) {
				getPlayer(clonnedFrame, function (clonedPlayer) {         
				  console.log("clonnedPlayer", clonedPlayer);
				  clonedPlayer.playVideo();  
				  clonedPlayer.seekTo(player.getCurrentTime(), true);
				  setTimeout(function () {
					clonedPlayer.pauseVideo();         
				  }, 0);              
				}, true);
			  });
			});        
		});    	    	
	}
	
	//reset iframe of non current slide
	$(".slider-youtube").on('beforeChange', function(event, slick, currentSlide) {
		var currentSlide, iframe, clonedFrame;
		currentSlide = $(slick.$slider).find(".slick-current");
		iframe = currentSlide.find("iframe");        
		getPlayer(iframe, function (player) {   
			player.pauseVideo();
		  updateClonnedFrames();
		});          
	});

	//start the slider
	$('.slider-youtube').slick({
		dots: true,
		arrows: true,  
		nextArrow: '<img class="slick-next" src="assets/images/next.png" alt="Next" />',
		prevArrow: '<img class="slick-prev" src="assets/images/prev.png" alt="Previous" />',
		slidesToShow: 1,
		infinite: true,
	});
});
