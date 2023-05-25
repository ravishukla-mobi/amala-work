$(document).ready(function() {
  
  $('.review-slider').slick({
  arrows: true,
  dots: false,
  slidesToShow: 2.5,
  infinite: false,
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 2.2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1.3,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1.2,
        slidesToScroll: 1
      }
    }
  ]
});
  
 $('.ingredients-slider').slick({
  arrows: true,
  dots: false,
  slidesToShow: 1,
  infinite: false
 });
  
  $('.blog-slider').slick({
  dots: false,
  infinite: false,
  arrows: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});
  
  
 $('.videos-slider').slick({
    dots: false,
   arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
});
  
 $(".set-tab .hdng-t").on("click", function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this)
        .siblings(".content-collepse")
        .slideUp(100);
    } else {
      $(".set-tab .hdng-t").removeClass("active");
      $(this).addClass("active");
      $(".content-collepse").slideUp(200);
      $(this)
        .siblings(".content-collepse")
        .slideDown(100);
    }
  });
  
  $(".set-tab2 .hdng-t").on("click", function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this)
        .siblings(".content-collepse2")
        .slideUp(100);
    } else {
      $(this).addClass("active");
      $(this)
        .siblings(".content-collepse2")
        .slideDown(100);
    }
  });

  $(document).on("click", ".how-to-us-tab .hdng-t", function() {
    $(".how-to-us-tab .content-collepse").slideUp(100);
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this).siblings(".content-collepse").slideUp(100);
    } else {
      $(".how-to-us-tab .hdng-t").removeClass("active");
      $(this).addClass("active");
      $(this).siblings(".content-collepse").slideDown(100);
    }
    });

  $(".additional_widget_headings.only_desktop_view .hdng-t").on("click", function() {
    const title = $(this).attr('data-title');
    $('.product_additional_widgets .content-collepse2').slideUp(100);
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(`.content-collepse2[data-content="${title}"]`).slideUp(100);
    } else {
      $('.product_additional_widgets .hdng-t').removeClass("active");
      $(this).addClass("active");
      $(`.content-collepse2[data-content="${title}"]`).slideDown(100);
    }
  });
  
});
$(document).on('click','.product_info_price_review_badge .pdp-stamped-main-badge-wrap',function(e){
  e.preventDefault();e.stopPropagation();
  const reviews_height = $("#shopify-section-product-reviews").offset().top,
        navbar_scroll_height = document.querySelector("[data-section-id='header']").offsetHeight;
  $('html, body').animate({scrollTop:reviews_height - navbar_scroll_height}, 2000);
});

$(document).on('click','.cbb-frequently-bought-container h2.cbb-frequently-bought-title',function(){
  $(this).parent().toggleClass("active");
});