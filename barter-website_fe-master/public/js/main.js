$(document).ready(function() {
	$('.header__nav li a').click(function() {
		$('html, body').animate(
			{
				scrollTop:
					$($(this).attr('href')).offset().top - $('.header').outerHeight()
			},
			{
				duration: 2000
			}
		)
		return false
	})

	$('.header__choose').on('click', function() {
		$('.header__language--dropdown').toggleClass('active')

		$('.header__language').toggleClass('active')
	})

	$('.header__nav li').hover(function() {
		if ($(window).width() > 992) {
			$(this).toggleClass('hover')
			$(this).find('.header__dropdown').toggleClass('hover')
		}
	})

	$('.header__nav li').on('click', function() {
		$(this).toggleClass('active')
		$(this).find('.header__dropdown').toggleClass('active')
	})

	$(window).scroll(function() {
		var sticky = $('.header'),
			scroll = $(window).scrollTop()

		if (scroll >= 80) sticky.addClass('fixed')
		else sticky.removeClass('fixed')
	})

	$('.header__burger').on('click', function() {
		$('.header__content').toggleClass('active')
		$('body').toggleClass('oveflow')
	})

	$('.header__close').on('click', function() {
		$('.header__content').removeClass('active')
		$('body').removeClass('oveflow')
	})

	$('.feedback__btn').on('click', function(e) {
		const $form = $(this).closest('.feedback__form')

		$.ajax({
			type: 'POST',
			url: 'mail.php',
			data: $form.serialize()
		}).done(function() {
			$.fancybox.open($('#modal-thanks'))
		})

		return false
	})

	$('.feedback__button').on('click', function(e) {
		const $form = $(this).closest('.about__form')

		$.ajax({
			type: 'POST',
			url: 'mail-new.php',
			data: $form.serialize()
		}).done(function() {
			$.fancybox.open($('#modal-thanks'))
			$('.field input').val('')
			$('.field textarea').val('')
		})

		return false
	})

	$('[data-tab-stake]').on('click', function() {
		if (!$(this).hasClass('active')) {
			var index = $(this).index()
			$(this).addClass('active').siblings().removeClass('active')
			$('[data-tab-stake-item]')
				.hide()
				.eq(index)
				.show()
		}
		return false
	})
})
