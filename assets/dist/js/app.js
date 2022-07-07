window.addEventListener('DOMContentLoaded', function () {
    //hamburger menu
    let hamburger = document.querySelector('.header__hamburger'),
        header = document.querySelector('.header'),
        searchHeader = document.querySelector('.header__search-icon');
    hamburger.addEventListener('click', function () {
        header.classList.toggle('menu_active');
    })
    searchHeader.addEventListener('click', function () {
        header.classList.toggle('header_search');
    });
    document.body.addEventListener('click', function (e) {
        let current = e.target;
    })
    try {

    } catch (e) {
        console.log('header issue', e);
    }
//swiper
    try {
        let swiper = new Swiper(".mySwiper", {
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                // clickable: true,
            },
        });
    } catch (e) {
        console.log('swiper error', e);
    }
})