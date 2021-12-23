const navToggle = document.querySelector('#mobile-nav-toggle');
const mobileNavContainer = document.querySelector('#mobile-nav-container');
const closeMobileNav = document.querySelector('#mobile-nav-close');

navToggle.addEventListener('click', mobileNavOpen);
closeMobileNav.addEventListener('click', mobileNavClose);

function mobileNavOpen() {
    mobileNavContainer.classList.remove('-translate-x-full')
    document.body.classList.add('overflow-hidden')
}
function mobileNavClose() {
    mobileNavContainer.classList.add('-translate-x-full')
    document.body.classList.remove('overflow-hidden')
}
