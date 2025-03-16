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
    const languageSelector = document.querySelector('.header__language .language-selector');
    const languageDropdown = document.querySelector('.header__language .language-dropdown');
    const mobileLanguageSelector = document.querySelector('.mobile-menu__language .language-selector');

    if (!languageSelector || !languageDropdown) return;

    // Функція оновлення обох селекторів
    const updateBothSelectors = (button) => {
        const flagSvg = button.querySelector('.language-dropdown__flag').cloneNode(true);
        const languageCode = button.querySelector('.language-dropdown__text').textContent.match(/\(([^)]+)\)/)[1];

        // Оновлюємо обидва селектори
        [languageSelector, mobileLanguageSelector].forEach(selector => {
            if (selector) {
                selector.querySelector('.language-selector__flag').innerHTML = flagSvg.innerHTML;
                selector.querySelector('.language-selector__text').textContent = languageCode;
            }
        });
    };

    // Обробник кліку на селектор
    languageSelector.addEventListener('click', e => {
        e.stopPropagation();
        languageSelector.classList.toggle('language-selector--active');
        languageDropdown.classList.toggle('language-dropdown--visible');
    });

    // Обробник кліку на кнопки в дропдауні
    document.querySelectorAll('.language-dropdown__button').forEach(button => {
        button.addEventListener('click', function() {
            updateBothSelectors(this);
            languageSelector.classList.remove('language-selector--active');
            languageDropdown.classList.remove('language-dropdown--visible');
        });
    });

    // Закриваємо дропдаун при кліку поза ним
    document.addEventListener('click', e => {
        if (!languageSelector.contains(e.target) && !languageDropdown.contains(e.target)) {
            languageSelector.classList.remove('language-selector--active');
            languageDropdown.classList.remove('language-dropdown--visible');
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
