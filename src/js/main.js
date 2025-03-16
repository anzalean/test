import { api } from './api.js';
import { utils } from './utils.js';
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';




// Основна логіка додатку
document.addEventListener('DOMContentLoaded', () => {
    // Ініціалізація додатку

    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq__question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            
            // Закриваємо всі інші відповіді
            faqQuestions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
            });
            
            // Перемикаємо поточну відповідь
            question.setAttribute('aria-expanded', !isExpanded);
        });
    });

    // Функціональність дропдауну вибору мови
    const languageSelector = document.querySelector('.language-selector');
    const languageDropdown = document.querySelector('.language-dropdown');
    
    if (languageSelector && languageDropdown) {
        // Відкриття/закриття дропдауну при кліку на селектор
        languageSelector.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Клік по селектору мови');
            languageSelector.classList.toggle('language-selector--active');
            languageDropdown.classList.toggle('language-dropdown--visible');
        });
        
        // Вибір мови з дропдауну
        const languageButtons = document.querySelectorAll('.language-dropdown__button');
        languageButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Отримуємо текст і прапор вибраної мови
                const flagSvg = this.querySelector('.language-dropdown__flag').cloneNode(true);
                const languageCode = this.querySelector('.language-dropdown__text').textContent.match(/\(([^)]+)\)/)[1];
                
                // Оновлюємо селектор
                const selectorFlag = languageSelector.querySelector('.language-selector__flag');
                const selectorText = languageSelector.querySelector('.language-selector__text');
                
                selectorFlag.innerHTML = flagSvg.innerHTML;
                selectorText.textContent = languageCode;
                
                // Позначаємо активний елемент
                document.querySelectorAll('.language-dropdown__item').forEach(item => {
                    item.classList.remove('language-dropdown__item--active');
                });
                this.closest('.language-dropdown__item').classList.add('language-dropdown__item--active');
                
                // Закриваємо дропдаун
                languageSelector.classList.remove('language-selector--active');
                languageDropdown.classList.remove('language-dropdown--visible');
            });
        });
        
        // Закриття дропдауну при кліку поза ним
        document.addEventListener('click', function(e) {
            if (!languageSelector.contains(e.target) && !languageDropdown.contains(e.target)) {
                languageSelector.classList.remove('language-selector--active');
                languageDropdown.classList.remove('language-dropdown--visible');
            }
        });
    }

    // Функціональність активного елемента навігації
    const navigationItems = document.querySelectorAll('.navigation__item');

    if (navigationItems.length > 0) {
        // Знаходимо елемент з класом navigation__link--active і встановлюємо його батьківський елемент як активний
        const activeLink = document.querySelector('.navigation__link--active');
        if (activeLink) {
            const activeItem = activeLink.closest('.navigation__item');
            if (activeItem) {
                // Спочатку видаляємо активний клас з усіх елементів
                navigationItems.forEach(navItem => {
                    navItem.classList.remove('navigation__item--active');
                });
                // Додаємо активний клас до елемента з активним посиланням
                activeItem.classList.add('navigation__item--active');
            }
        } else {
            // Якщо немає активного посилання, встановлюємо перший елемент як активний
            navigationItems[0].classList.add('navigation__item--active');
        }
        
        // Додаємо обробники кліків
        navigationItems.forEach(item => {
            item.addEventListener('click', function() {
                // Видаляємо активний клас з усіх елементів
                navigationItems.forEach(navItem => {
                    navItem.classList.remove('navigation__item--active');
                    const link = navItem.querySelector('.navigation__link');
                    if (link) {
                        link.classList.remove('navigation__link--active');
                    }
                });
                
                // Додаємо активний клас до поточного елемента
                this.classList.add('navigation__item--active');
                const link = this.querySelector('.navigation__link');
                if (link) {
                    link.classList.add('navigation__link--active');
                }
            });
        });
    }

    // Ініціалізація Swiper для відгуків
    const reviewsSwiper = () => {
        const section = document.querySelector('.players-feedback');
        if (!section) {
            console.log("Секція players-feedback не знайдена");
            return;
        }
        
        const reviewsSlider = section.querySelector('.players-feedback__slider');
        if (!reviewsSlider) {
            console.log("Слайдер не знайдений в секції players-feedback");
            return;
        }
        
        const swiper = new Swiper(reviewsSlider, {
            slidesPerView: 2,
            spaceBetween: 19,
            speed: 600,
            autoHeight: false,
            keyboard: {
                enabled: true,
                onlyInViewport: false,
            },
            navigation: {
                nextEl: section.querySelector('.players-feedback__nav--next'),
                prevEl: section.querySelector('.players-feedback__nav--prev'),
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 19
                }
            }
        });
        
        console.log("Swiper ініціалізовано успішно");
    };
    
    // Викликаємо функцію ініціалізації Swiper
    reviewsSwiper();
});

document.addEventListener('DOMContentLoaded', function () {
    
    new Accordion('.accordion-container', {
     
        showMultiple: true, 
        duration: 300, 
    });
});