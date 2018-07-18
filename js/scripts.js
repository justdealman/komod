function setImgCover(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'cover'
		});
	});
}
function setImgContain(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'contain'
		});
	});
}
function setRatio() {
	$('[data-ratio]').each(function() {
		var t = $(this).find('.scale');
		var r = $(this).attr('data-ratio');
		t.outerHeight(t.outerWidth()*r);
	});
}
$(function() {
	setImgCover($('.img-cover'));
	setImgContain($('.img-contain'));
	var isMobile = false;
	var justSwitched = false;
	function detectDevice() {
		var temp = isMobile;
		if ( Modernizr.mq('(max-width:999px)') ) {
			isMobile = true;
		} else {
			isMobile = false;
		}
		if ( temp == isMobile ) {
			justSwitched = false;
		} else {
			justSwitched = true;
		}
	}
	$('.catalog-b__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		infinite: true,
		cssEase: 'ease',
		speed: 500,
		autoplaySpeed: 1500
	});
	$('.catalog-b__watched').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease',
		speed: 500,
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 3
				}
			}, {
				breakpoint: 999,
				settings: {
					slidesToShow: 2
				}
			}, {
				breakpoint: 767,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	$('.catalog-b .catalog-b--favorite').on('click', function() {
		$(this).toggleClass('is-active');
	});
	function setWatchedSlider() {
		$('.catalog-b__watched').each(function() {
			var max = 0;
			$(this).find('.catalog-b__item').each(function() {
				var h = $(this).outerHeight(); 
				max = h > max ? h : max;
			});
			$(this).find('.catalog-b__item').outerHeight(max);
		});
	}
	$('.product-b__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		infinite: true,
		cssEase: 'ease',
		speed: 500,
		asNavFor: '.product-b__preview',
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					fade: true,
					cssEase: 'ease'
				}
			}
		]
	});
	$('.product-b__preview').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease',
		speed: 500,
		asNavFor: '.product-b__slider',
		responsive: [
			{
				breakpoint: 767,
				settings: {
					arrows: false
				}
			}
		]
	});
	$('.item-product-preview').on('click', function() {
		$('.product-b__slider').slick('slickGoTo',parseInt($(this).attr('data')-1));
	});
	function startApp() {
		detectDevice();
		if ( justSwitched ) {
			if ( isMobile ) {

			} else {

			}
		}
		if ( Modernizr.mq('(max-width:1199px)') && Modernizr.mq('(min-width:1000px)') ) {
			$('.footer__contacts').detach().appendTo($('.footer__nav_3'));
		} else {
			$('.footer__contacts').detach().insertAfter($('.footer__nav_3'));
		}
		setRatio();
		setTimeout(function() {
			setWatchedSlider();
		}, 100);
	}
	startApp();
	var lastWidth = $(window).width();
	$(window).on('resize', _.debounce(function() {
		if ( $(window).width() != lastWidth ) {
			startApp();
			lastWidth = $(window).width();
		}
	}, 100));
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$('[data-tabs-nav] a').on('click', function(e) {
		e.preventDefault();
		if ( !$(this).parents('li').hasClass('is-active') ) {
			var elems = $(this).parents('[data-tabs]').find('[data-tab]');
			elems.filter('[data-tab="'+$(this).attr('href')+'"]').addClass('is-opened').siblings().removeClass('is-opened');
			$(this).parents('li').addClass('is-active').siblings().removeClass('is-active');
		}
	});
	$('.product-b [data-favorite]').on('click', function() {
		var id = $(this).attr('data-favorite');
		if ( !$(this).hasClass('is-active') ) {
			$('.product-b [data-favorite="'+id+'"]').addClass('is-active');
		} else {
			$('.product-b [data-favorite="'+id+'"]').removeClass('is-active');
		}
	});
});