window.addEventListener('DOMContentLoaded', function () {
    //hamburger menu
    let hamburger = document.querySelector('.header__hamburger'),
        header = document.querySelector('.header'),
        searchHeader = document.querySelector('.header__search-icon');
    hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        header.classList.toggle('menu_active');
    })
    searchHeader.addEventListener('click', function (e) {
        e.stopPropagation();
        header.classList.toggle('header_search');
    });
    document.body.addEventListener('click', function (e) {
        let current = e.target;
        if (!current.closest('.header__nav')) {
            header.classList.remove('menu_active');
        }
        if (!current.closest('.header__search')) {
            header.classList.remove('header_search');
        }
    })
    try {

    } catch (e) {
        console.log('header issue', e);
    }
//swiper
    try {
        let checkSwiperExist = document.querySelector('.app-block-swiper .mySwiper');
        if (checkSwiperExist) {
            let swiper = new Swiper(".mySwiper", {
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            });
        }
    } catch (e) {
        console.log('swiper error', e);
    }
})