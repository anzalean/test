function initMobileMenu() {
    const burgerBtn = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (!burgerBtn || !mobileMenu) return;

    burgerBtn.addEventListener('click', () => {
        const isOpen = burgerBtn.classList.contains('is-active');
        
        burgerBtn.classList.toggle('is-active');
        mobileMenu.classList.toggle('is-open');
        
        // Блокуємо скрол при відкритому меню
        body.style.overflow = !isOpen ? 'hidden' : '';
    });

    // Закриваємо меню при кліку на посилання
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerBtn.classList.remove('is-active');
            mobileMenu.classList.remove('is-open');
            body.style.overflow = '';
        });
    });

    // Закриваємо меню при кліку поза меню
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target) && mobileMenu.classList.contains('is-open')) {
            burgerBtn.classList.remove('is-active');
            mobileMenu.classList.remove('is-open');
            body.style.overflow = '';
        }
    });

    // Закриваємо меню при ресайзі вікна більше 1439px
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1439) {
            burgerBtn.classList.remove('is-active');
            mobileMenu.classList.remove('is-open');
            body.style.overflow = '';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    setupFAQ();
    setupLanguageSelector();
    setupNavigation();
    initReviewsSwiper();
    initAccordion();
    initSidebar();
});

function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq__question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            faqQuestions.forEach(q => q.setAttribute('aria-expanded', 'false'));

            question.setAttribute('aria-expanded', !isExpanded);
        });
    });
}

function setupLanguageSelector() {
    const headerSelector = document.querySelector('.header__language .language-selector');
    const headerDropdown = document.querySelector('.header__language .language-dropdown');
    const mobileSelector = document.querySelector('.mobile-menu__language .language-selector');
    const mobileDropdown = document.querySelector('.mobile-menu__language .language-dropdown');

    if (!headerSelector || !headerDropdown) return;

    // Функція оновлення обох селекторів
    const updateBothSelectors = (button) => {
        const flagSvg = button.querySelector('.language-dropdown__flag').cloneNode(true);
        const languageCode = button.querySelector('.language-dropdown__text').textContent.match(/\(([^)]+)\)/)[1];

        // Оновлюємо обидва селектори
        [headerSelector, mobileSelector].forEach(selector => {
            if (selector) {
                selector.querySelector('.language-selector__flag').innerHTML = flagSvg.innerHTML;
                selector.querySelector('.language-selector__text').textContent = languageCode;
            }
        });

        // Оновлюємо активний стан в обох дропдаунах
        document.querySelectorAll('.language-dropdown__item').forEach(item => {
            item.classList.remove('language-dropdown__item--active');
        });

        // Знаходимо і активуємо відповідні елементи в обох дропдаунах
        const selectedText = button.querySelector('.language-dropdown__text').textContent;
        document.querySelectorAll('.language-dropdown__button').forEach(btn => {
            if (btn.querySelector('.language-dropdown__text').textContent === selectedText) {
                btn.closest('.language-dropdown__item').classList.add('language-dropdown__item--active');
            }
        });
    };

    // Функція закриття дропдаунів
    const closeDropdowns = () => {
        headerSelector.classList.remove('language-selector--active');
        headerDropdown.classList.remove('language-dropdown--visible');
        if (mobileSelector && mobileDropdown) {
            mobileSelector.classList.remove('language-selector--active');
            mobileDropdown.classList.remove('language-dropdown--visible');
        }
    };

    // Обробник кліку на селектор в хедері
    headerSelector.addEventListener('click', e => {
        e.stopPropagation();
        headerSelector.classList.toggle('language-selector--active');
        headerDropdown.classList.toggle('language-dropdown--visible');
        if (mobileDropdown) {
            mobileDropdown.classList.remove('language-dropdown--visible');
        }
    });

    // Обробник кліку на мобільний селектор
    if (mobileSelector && mobileDropdown) {
        mobileSelector.addEventListener('click', e => {
            e.stopPropagation();
            mobileSelector.classList.toggle('language-selector--active');
            mobileDropdown.classList.toggle('language-dropdown--visible');
            headerDropdown.classList.remove('language-dropdown--visible');
        });
    }

    // Обробник кліку на кнопки в дропдауні
    document.querySelectorAll('.language-dropdown__button').forEach(button => {
        button.addEventListener('click', function() {
            updateBothSelectors(this);
            closeDropdowns();
        });
    });

    // Закриваємо дропдауни при кліку поза ними
    document.addEventListener('click', e => {
        if (!headerSelector.contains(e.target) && 
            !headerDropdown.contains(e.target) && 
            (!mobileSelector || !mobileSelector.contains(e.target)) && 
            (!mobileDropdown || !mobileDropdown.contains(e.target))) {
            closeDropdowns();
        }
    });
}

function setupNavigation() {
    const navigationItems = document.querySelectorAll('.navigation__item');
    if (navigationItems.length === 0) return;

    const activeLink = document.querySelector('.navigation__link--active');
    const activeItem = activeLink?.closest('.navigation__item') || navigationItems[0];

    navigationItems.forEach(item => item.classList.remove('navigation__item--active'));
    activeItem.classList.add('navigation__item--active');

    navigationItems.forEach(item => {
        item.addEventListener('click', function () {
            navigationItems.forEach(navItem => {
                navItem.classList.remove('navigation__item--active');
                navItem.querySelector('.navigation__link')?.classList.remove('navigation__link--active');
            });

            this.classList.add('navigation__item--active');
            this.querySelector('.navigation__link')?.classList.add('navigation__link--active');
        });
    });
}

function initReviewsSwiper() {
    const section = document.querySelector('.players-feedback');
    if (!section) return;

    const reviewsSlider = section.querySelector('.players-feedback__slider');
    if (!reviewsSlider) return;

    new Swiper(reviewsSlider, {
        slidesPerView: 2,
        spaceBetween: 19,
        speed: 600,
        keyboard: { enabled: true, onlyInViewport: false },
        navigation: {
            nextEl: section.querySelector('.players-feedback__nav--next'),
            prevEl: section.querySelector('.players-feedback__nav--prev'),
        },
        breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
        },
    });
}

function initAccordion() {
    new Accordion('.accordion-container', { showMultiple: true, duration: 300 });
}

function initSidebar() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarMobile = document.querySelector('.sidebar-mobile');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const sidebarClose = document.querySelector('.sidebar-mobile__close');
    const body = document.body;

    if (!sidebarToggle || !sidebarMobile || !sidebarOverlay || !sidebarClose) return;

    const openSidebar = () => {
        sidebarMobile.classList.add('is-open');
        sidebarOverlay.classList.add('is-visible');
        body.style.overflow = 'hidden';
    };

    const closeSidebar = () => {
        sidebarMobile.classList.remove('is-open');
        sidebarOverlay.classList.remove('is-visible');
        body.style.overflow = '';
    };

    sidebarToggle.addEventListener('click', openSidebar);
    sidebarClose.addEventListener('click', closeSidebar);
    
    // Закриваємо при кліку поза сайдбаром
    document.addEventListener('click', (e) => {
        if (sidebarMobile.classList.contains('is-open') && 
            !sidebarMobile.contains(e.target) && 
            !sidebarToggle.contains(e.target)) {
            closeSidebar();
        }
    });

    // Закриваємо при кліку на оверлей
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Закриваємо при натисканні Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebarMobile.classList.contains('is-open')) {
            closeSidebar();
        }
    });

    // Закриваємо сайдбар при ресайзі на десктоп
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1439) {
            closeSidebar();
        }
    });
}
