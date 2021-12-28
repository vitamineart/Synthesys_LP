const togglePrices = document.querySelector('#prices-toggle');
const pricesContainer = document.querySelectorAll('.subscription-plans-container');
togglePrices.addEventListener('click', function({target}){
    pricesContainer.forEach(function(item){
        item.classList.toggle('yearly');
        target.closest('#toggle-container').classList.toggle('yearly');
    })
});
const subscriptionPlansSwiper = new Swiper('.subscription-plans-container', {
    centeredSlides: true,
    pagination: {
        el: '.swiper-paination',
        type: 'bullets'
    },
    slidesPerView: 'auto',
    spaceBetween: 20,
    loop: false,
    speed: 400,
    initialSlide: 1,
    breakpoints: {
        375: { spaceBetween: 20 },
        420: { spaceBetween: 30 },
        640: { spaceBetween: 50 },
        768: { spaceBetween: 100 }
    }
});
