window.addEventListener('DOMContentLoaded', function () {
    //dynamic adapt
    function DynamicAdapt(type) {
        this.type = type;
    }

    DynamicAdapt.prototype.init = function () {
        const _this = this;
        // массив объектов
        this.оbjects = [];
        this.daClassname = "_dynamic_adapt_";
        // массив DOM-элементов
        this.nodes = document.querySelectorAll("[data-da]");

        // наполнение оbjects объктами
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const data = node.dataset.da.trim();
            const dataArray = data.split(",");
            const оbject = {};
            оbject.element = node;
            оbject.parent = node.parentNode;
            оbject.destination = document.querySelector(dataArray[0].trim());
            оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
            оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.оbjects.push(оbject);
        }

        this.arraySort(this.оbjects);

        // массив уникальных медиа-запросов
        this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
            return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
        }, this);
        this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
            return Array.prototype.indexOf.call(self, item) === index;
        });

        // навешивание слушателя на медиа-запрос
        // и вызов обработчика при первом запуске
        for (let i = 0; i < this.mediaQueries.length; i++) {
            const media = this.mediaQueries[i];
            const mediaSplit = String.prototype.split.call(media, ',');
            const matchMedia = window.matchMedia(mediaSplit[0]);
            const mediaBreakpoint = mediaSplit[1];

            // массив объектов с подходящим брейкпоинтом
            const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
                return item.breakpoint === mediaBreakpoint;
            });
            matchMedia.addListener(function () {
                _this.mediaHandler(matchMedia, оbjectsFilter);
            });
            this.mediaHandler(matchMedia, оbjectsFilter);
        }
    };

    DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
        if (matchMedia.matches) {
            for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            }
        } else {
            for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) {
                    this.moveBack(оbject.parent, оbject.element, оbject.index);
                }
            }
        }
    };

// Функция перемещения
    DynamicAdapt.prototype.moveTo = function (place, element, destination) {
        element.classList.add(this.daClassname);
        if (place === 'last' || place >= destination.children.length) {
            destination.insertAdjacentElement('beforeend', element);
            return;
        }
        if (place === 'first') {
            destination.insertAdjacentElement('afterbegin', element);
            return;
        }
        destination.children[place].insertAdjacentElement('beforebegin', element);
    }

// Функция возврата
    DynamicAdapt.prototype.moveBack = function (parent, element, index) {
        element.classList.remove(this.daClassname);
        if (parent.children[index] !== undefined) {
            parent.children[index].insertAdjacentElement('beforebegin', element);
        } else {
            parent.insertAdjacentElement('beforeend', element);
        }
    }

// Функция получения индекса внутри родителя
    DynamicAdapt.prototype.indexInParent = function (parent, element) {
        const array = Array.prototype.slice.call(parent.children);
        return Array.prototype.indexOf.call(array, element);
    };

// Функция сортировки массива по breakpoint и place
// по возрастанию для this.type = min
// по убыванию для this.type = max
    DynamicAdapt.prototype.arraySort = function (arr) {
        if (this.type === "min") {
            Array.prototype.sort.call(arr, function (a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) {
                        return 0;
                    }

                    if (a.place === "first" || b.place === "last") {
                        return -1;
                    }

                    if (a.place === "last" || b.place === "first") {
                        return 1;
                    }

                    return a.place - b.place;
                }

                return a.breakpoint - b.breakpoint;
            });
        } else {
            Array.prototype.sort.call(arr, function (a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) {
                        return 0;
                    }

                    if (a.place === "first" || b.place === "last") {
                        return 1;
                    }

                    if (a.place === "last" || b.place === "first") {
                        return -1;
                    }

                    return b.place - a.place;
                }

                return b.breakpoint - a.breakpoint;
            });
            return;
        }
    };

    const da = new DynamicAdapt("max");
    da.init();


    try {
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
    } catch (e) {
        console.log('header issue', e);
    }

    //filters sidebar toggle
    try {
        let filterTrigger = document.querySelectorAll('.filter-item .gamma.widget-title');
        if (filterTrigger) {
            filterTrigger.forEach(trigger => {
                trigger.addEventListener('click', e => {
                    let current = e.target;
                    if (current.closest('.filter-item')) {
                        current.closest('.filter-item').classList.toggle('active');
                    }
                })
            })
        }
    } catch (e) {
        console.log('filter sidebar ', e)
    }

    //filter mobile trigger expand
    try {
        let triggerBtn = document.querySelector('.trigger-mobile-expand');
        if (triggerBtn) {
            triggerBtn.addEventListener('click', e => {
                let current = e.target,
                    closestSidebar = current.closest('.app-page-category__sidebar');
                if (closestSidebar) {
                    closestSidebar.classList.toggle('mobile-disabled');
                }
            })
        }
    } catch (e) {
        console.log('filter mobile trigger expand error ', e);
    }

    //expand trigger
    try {
        let expandTrigger = document.querySelectorAll('.expand-trigger'),
            expandBody = document.querySelectorAll('.expand-body');
        if (expandTrigger && expandBody && (expandTrigger.length === expandBody.length)) {
            expandTrigger.forEach((item, index) => {
                item.addEventListener('click', function (e) {
                    if (expandTrigger[index] && expandBody[index]) {
                        expandTrigger[index].classList.toggle('active');
                        expandBody[index].classList.toggle('active');
                    }
                })
            })
        }
    } catch (e) {
        console.log('expand/collapse error ', e)
    }

//swiper catalog page
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
        console.log('swiper error [catalog page]', e);
    }

    //swiper home page top
    try {
        let checkSwiperExist = document.querySelector('.app-block-home-top__swiper .mySwiper-home-top');
        if (checkSwiperExist) {
            let swiperHomeTop = new Swiper(".mySwiper-home-top", {
                navigation: {
                    nextEl: ".swiper-button-next-arrowed",
                    prevEl: ".swiper-button-prev-arrowed",
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            });
        }
    } catch (e) {
        console.log('swiper error [home-top]', e);
    }

    //swiper shop-by-room
    try {
        let checkSwiperExist = document.querySelector('.app-block-shop-by-room__swiper .swiper-shop-by-room');
        if (checkSwiperExist) {
            let swiperShopByRoom = new Swiper(".swiper-shop-by-room", {
                slidesPerView: 4,
                spaceBetween: 29,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                breakpoints: {
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    // when window width is >= 768px
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 29
                    },
                },
            });
        }

    } catch (e) {
        console.log('swiper error [shop by room]');
    }

    //swiper shop-by-brand
    try {
        let checkSwiperExist = document.querySelector('.app-block-shop-by-brand__swiper .swiper-shop-by-brand');
        if (checkSwiperExist) {
            let swiperShopByBrand = new Swiper(".swiper-shop-by-brand", {
                slidesPerView: 5,
                spaceBetween: 29,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                breakpoints: {
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 40
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 40
                    },
                    1250: {
                        slidesPerView: 5,
                        spaceBetween: 67
                    },

                },
            });
        }

    } catch (e) {
        console.log('swiper error [shop by brand]');
    }
    //swiper explore
    try {
        let checkSwiperExist = document.querySelector('.app-block-explore__swiper .swiper-explore');
        if (checkSwiperExist) {
            let swiperExplore = new Swiper(".swiper-explore", {
                slidesPerView: 6,
                spaceBetween: 28,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                breakpoints: {
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    1250: {
                        slidesPerView: 6,
                        spaceBetween: 28
                    },

                },
            });
        }

    } catch (e) {
        console.log('swiper error [explore]');
    }
})

//swiper product page
try {
    let checkSwiperExist = document.querySelector('.related-products .swiper-products-like');

    if (checkSwiperExist) {
        let swiperExplore = new Swiper(".swiper-products-like", {
            // slidesPerView: 5,
            // spaceBetween: 70,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                1250: {
                    slidesPerView: 5,
                    spaceBetween: 70
                },

            },
        });
    }

} catch (e) {
    console.log('swiper product page error ', e);
}

//swiper cart page
try {
    let checkSwiperExist = document.querySelector('.woo-cart .swiper-cart-page');

    if (checkSwiperExist) {
        let swiperCart = new Swiper(".swiper-cart-page", {
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 2,
                    spaceBetween: 27
                },
                936: {
                    slidesPerView: 4,
                    spaceBetween: 46
                },
            },
        });
    }

} catch (e) {
    console.log('swiper cart page error ', e);
}