$(document).ready(function(){
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });


  function toggleSlide(item) {
    $(item).each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq((i)).toggleClass('catalog-item__content_active');
            $('.catalog-item__reverse').eq((i)).toggleClass('catalog-item__reverse_active');
        })
      })
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  //Modal

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn();
  });
  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  })
  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn();
    });
  });

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
        },
      },
      messages: {
        name: "Введите своё имя",
        phone: "Введите свой номер телефона",
        email: {
          required: "Введите свою почту",
          email: "Неправильно введён адрес почты",
        }
      },
    });
  }
  
  validateForms('#consultation form');
  validateForms('#consultation-form');
  validateForms('#order form');

  $("input[name=phone]").mask("+7 (999) 999-99-99");

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false
  });


    // Smooth scroll and pageup

    $(window).scroll(function() {
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    $('a[href=up]').click(function() {
      const _href = $(this).attr("href");
      $('html, body').animate({
        scrollTop: $(href).offset().top
    }, {
        duration: 370,   // по умолчанию «400» 
        easing: "linear" // по умолчанию «swing» 
    });
    
      return false;
    });

    new WOW().init();

    
});

let slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
    
});

document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });
document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  });