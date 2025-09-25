$(document).ready(function () {
	$('.section').click(function () {
		$('html, body').animate(
			{
				scrollTop:
					$($(this).attr('href')).offset().top - $('.header').outerHeight(),
			},
			{
				duration: 2000,
			}
		)
		return false
	})

	$('.header__choose').on('click', function () {
		$('.header__language--dropdown').toggleClass('active')

		$('.header__language').toggleClass('active')
	})

	$('.header__nav li').hover(function () {
		if ($(window).width() > 992) {
			$(this).toggleClass('hover')
			$(this).find('.header__dropdown').toggleClass('hover')
		}
	})

	$('.header__nav li').on('click', function () {
		$(this).toggleClass('active')
		$(this).find('.header__dropdown').toggleClass('active')

	})

	$(window).scroll(function () {
		var sticky = $('.header'),
			scroll = $(window).scrollTop()

		if (scroll >= 80) sticky.addClass('fixed')
		else sticky.removeClass('fixed')
	})

	$('.header__burger').on('click', function () {
		$('.header__content').toggleClass('active')
		$('body').toggleClass('oveflow')
	})

	$('.header__close').on('click', function () {
		$('.header__content').removeClass('active')
		$('body').removeClass('oveflow')
	})

	$('#about-feedback__btn').on('click', function (e) {
		const form = $(this).closest('.feedback__form')

		const fields = {};

		$.each(form.serializeArray(), function(_, v) {
          fields[v.name] = v.value;
		});

    const message = ["#покупка", fields.fullName, fields.phone, fields.message]
      .filter((v) => v)
      .join(" ");

    submitFeedbackData({ message, email: fields.email });

		return false;
	})

	$('#home-feedback__btn').on('click', function (e) {
		const form = $(this).closest('.feedback__form')

		const fields = {};

		$.each(form.serializeArray(), function(_, v) {
          fields[v.name] = v.value;
		});

    const message = ["#фидбэк", fields.message]
      .filter((v) => v)
      .join(" ");

    submitFeedbackData({ message, email: fields.email });

		return false;
	})

  function submitFeedbackData(data) {
    return $.ajax({
			type: 'POST',
			url: 'https://barter.company/api/submit',
			crossDomain: true,
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(data),
    }).done(function () {
      clearFormFields();
      openThanksModal();
		}).fail(function (e) {
			console.error(e);
			alert("Sorry. Server unavailable. ;(");
		})
  }

  function clearFormFields() {
    $('.field input').val('');
    $('.field textarea').val('');
  }

  function openThanksModal() {
    $.fancybox.open($('#modal-thanks'));
  }
})
