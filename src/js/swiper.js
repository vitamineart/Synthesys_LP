const reviewsSwiper = new Swiper('.reviews-slider', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  speed: 400,
    effect: 'creative',
    creativeEffect: {
        prev: {
        // will set `translateZ(-400px)` on previous slides
            translate: [0, 0, -1000],
            opacity: 0
        },
        next: {
            // will set `translateX(100%)` on next slides
            translate: ['100%', 0, 0],
            opacity: 1
        },
    },
  // Navigation arrows
  navigation: {
    nextEl: '.reviews-next',
    prevEl: '.reviews-prev',
  }

});

const voiceExamplesSwiper = new Swiper('.voice-examples-slider', {
  // Optional parameters
  direction: 'horizontal',
  slidesPerView: 2,
  spaceBetween: 30,
  breakpoints: {
    1536: {
      spaceBetween: 70,
    }
  },
  loop: true,
  speed: 400,

  // Navigation arrows
  navigation: {
    nextEl: '.voice-examples-next',
    prevEl: '.voice-examples-prev',
  }

});

const videoExamplesSwiper = new Swiper('.video-examples-slider', {
  // Optional parameters
  direction: 'horizontal',
  slidesPerView: 2,
  spaceBetween: 30,
  breakpoints: {
    1536: {
      spaceBetween: 70,
    }
  },
  loop: true,
  speed: 400,

  // Navigation arrows
  navigation: {
    nextEl: '.video-examples-next',
    prevEl: '.video-examples-prev',
  }

});


