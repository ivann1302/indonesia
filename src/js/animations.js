// Анимации для сайта Explore Indonesia

document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления h1 "Explore Indonesia" сверху вниз
    const titleElement = document.querySelector('.hero-section__title-text');
    
    if (titleElement) {
        // Добавляем класс animate через небольшую задержку
        setTimeout(() => {
            titleElement.classList.add('animate');
        }, 300); // Задержка 300ms для плавного появления
    }

    // Анимация появления изображений при скролле
    const destinationImages = document.querySelectorAll('.destination-section__image');
    
    // Функция для проверки видимости элемента
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Элемент считается видимым, если он находится в пределах 100px от входа в viewport
        return rect.top <= windowHeight - 100 && rect.bottom >= 0;
    }

    // Функция для обработки скролла
    function handleScroll() {
        destinationImages.forEach(image => {
            if (isElementInViewport(image) && !image.classList.contains('animate')) {
                image.classList.add('animate');
            }
        });
    }

    // Добавляем обработчик скролла
    window.addEventListener('scroll', handleScroll);
    
    // Проверяем при загрузке страницы (на случай если элементы уже видны)
    handleScroll();

    // Оптимизация производительности - используем requestAnimationFrame
    let ticking = false;
    
    function optimizedScrollHandler() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Заменяем обычный обработчик на оптимизированный
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', optimizedScrollHandler);

    console.log('🎬 Анимации инициализированы:');
    console.log('• H1 "Explore Indonesia" - анимация сверху вниз');
    console.log('• Destination images - анимация при скролле');
});
