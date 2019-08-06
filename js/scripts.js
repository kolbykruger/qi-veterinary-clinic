// Links return false
$('a:not(.force), button:not(.force), input[type="submit"]:not(.force)').click(function() {
    return false
})

//Responsive iFrame
$('iframe[src*="youtube"]').wrap('<div class="responsiveIframe"/>');

//Nav
    //$( ".nav > .drop_trigger, .mobile_nav > .drop_trigger" ).each(function(){$( this ).children('a:first').attr( "onclick", "return false" );});

    $('.nav .drop_menu').each(function() {
       if ($(this).find(".item").length >= 8) {
           $(this).addClass('column_nav');
       }
    });

	$('.navicon').click(function() {
	    if($('.mobile-nav').is(':visible')){
    	    $('.mobile-nav').fadeOut(100).attr('aria-hidden', 'true').attr('aria-expanded', 'false');
    		$('body,html').css({'overflow':'auto','height':'auto'});
    		$('.header').css({'position':'relative','z-index':'0'});
    		$('.navicon').find('i').attr( "class", "fal fa-bars");
    		$('button.navicon').attr( "aria-label", "Open Mobile Menu");
	    }else{
	        $('.mobile-nav').fadeIn(400).attr('aria-hidden', 'false').attr('aria-expanded', 'true');
	        $('body,html').css({'overflow':'hidden','height':'0'});
	        $('.header').css({'position':'fixed','z-index':'9999'});
	        $('.navicon').find('i').attr( "class", "fal fa-times");
	        $('button.navicon').attr( "aria-label", "Close Mobile Menu");
	    }
	});

    var hoverTimeout;
    $('.nav .trigger').hover(function() {
        clearTimeout(hoverTimeout);
        $(this).addClass('open').find('.drop').attr('aria-hidden', 'true').attr('aria-expanded', 'false');
        $('.trigger').not(this).removeClass("open");
    }, function() {
        var $self=$(this);
        hoverTimeout = setTimeout(function() {
            $self.removeClass('open').find('.drop').attr('aria-hidden', 'true').attr('aria-expanded', 'false');
        }, 250);
    });

    $('.nav .trigger > a').focusin(function() {
        var parent = $(this).parent();
        parent.addClass('open').find('.drop').attr('aria-hidden','false').attr('aria-expanded', 'true');
        $('.trigger').not(parent).removeClass("open");
    });

    $('.nav .drop a:last,.nav .drop input').focusout(function() {
        var parent = $(this).parents().find('.trigger');
        parent.removeClass('open').find('.drop').attr('aria-hidden','true').attr('aria-expanded', 'false');
    });

    $('.mobile-nav .trigger > *').click(function(){
        var parent = $(this).closest('.trigger');
        var icon = parent.find('.trigger-icon');
        var aonclick = parent.find('a:first').is('[onclick]');
        if($(this).is('a')){
            if(aonclick === true){
            	$('.trigger').not(parent).removeClass("open").find('i').attr( "class", "fal fa-plus");
            	parent.toggleClass("open");
                if(parent.hasClass('open')){
                    $(icon).find('i').attr( "class", "fal fa-minus");
                }else{
                    $(icon).find('i').attr( "class", "fal fa-plus");
                }
            }
        }
        if($(this).hasClass('trigger-icon')){
            parent.toggleClass("open");
    		$('.mobile-nav > .trigger').not(parent).removeClass("open").find('i').attr( "class", "fal fa-plus");
            if(parent.hasClass('open')){
                $(icon).find('i').attr( "class", "fal fa-minus");
                $('.open > .drop').attr('aria-hidden','false');
            }else{
                $(icon).find('i').attr( "class", "fal fa-plus");
                $('.drop').attr('aria-hidden','true');
            }
        }
    });

    $('button.mobile-closer').click(function(){
        $('.mobile-nav').fadeOut(100).attr('aria-hidden', 'true').attr('aria-expanded', 'false');
    	$('body,html').css({'overflow':'auto','height':'auto'});
    	$('.header').css({'position':'relative','z-index':'0'});
    	$('.navicon').find('i').attr( "class", "fal fa-bars");
    	$('.navicon').attr( "aria-label", "Open Mobile Menu");
    });

//Slideshow
$('.slideshow .container').slick({
  autoplay: true,
  autoplaySpeed: 5000,
  dots: false,
  infinite: true,
  fade: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow:'<button class="prev" title="Previous Slide"><i class="fal fa-chevron-left"></i></button>',
  nextArrow:'<button class="next" title="Next Slide"><i class="fal fa-chevron-right"></i></button>'
});

$(window).on('load resize orientationchange', function() {
    $('.mobile_slider').each(function(){
    var $carousel = $(this);
        if ($(window).width() > 600) {
            if ($carousel.hasClass('slick-initialized')) {
                $carousel.slick('unslick');
            }
        }
        else{
            if (!$carousel.hasClass('slick-initialized')) {
                $carousel.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    mobileFirst: true,
                    prevArrow:'<button class="slide_nav prev" title="Previous Slide"><i class="fal fa-chevron-left"></i></button>',
                    nextArrow:'<button class="slide_nav next" title="Next Slide"><i class="fal fa-chevron-right"></i></button>'
                });
            }
        }
    });
});

$('.slide').each(function(){
    $(this).removeAttr("aria-describedby");
});
