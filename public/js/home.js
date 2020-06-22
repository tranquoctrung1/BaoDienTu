// owl-carousel for top 10 most views
$(".most-view .owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1,
      dots: true,
      nav: false,
    },
    600: {
      items: 2,
      dots: true,
      nav: false,
    },
    1000: {
      items: 3,
      dots: false,
      nav: true,
    },
  },
});

// owl-carousel for top 10 newest

$(".newest .owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1,
      dots: true,
      nav: false,
    },
    600: {
      items: 2,
      dots: true,
      nav: false,
    },
    1000: {
      items: 3,
      dots: false,
      nav: true,
    },
  },
});

// owl-carousel for top 10 posting

$(".top-ten .owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1,
      dots: true,
      nav: false,
    },
    600: {
      items: 2,
      dots: true,
      nav: false,
    },
    1000: {
      items: 3,
      dots: false,
      nav: true,
    },
  },
});
