const reviewsSwiper = new Swiper('.reviews-slider', {
  direction: 'horizontal',
  loop: true,
  speed: 400,
  effect: 'creative',
  creativeEffect: {
      prev: {
          translate: [0, 0, -1000],
          opacity: 0
      },
      next: {
          translate: ['100%', 0, 0],
          opacity: 1
      },
  },
  navigation: {
    nextEl: '.reviews-next',
    prevEl: '.reviews-prev',
  },
  preloadImages: false,
  watchSlidesProgress: true

});


