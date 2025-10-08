document.addEventListener('DOMContentLoaded', function () {
  try {
    const sliderTrack = document.querySelector('.slider__track');
    const sliderItems = Array.from(document.querySelectorAll('.slider__item'));
    const prevButton = document.querySelector('.slider__button--prev');
    const nextButton = document.querySelector('.slider__button--next');
    const dots = document.querySelectorAll('.slider__dot');

    // Проверяем наличие всех необходимых элементов
    if (!sliderTrack || !sliderItems.length || !prevButton || !nextButton || !dots.length) {
      console.warn('Slider: Не найдены необходимые элементы для работы слайдера');
      return;
    }

    let currentIndex = 0;
    const itemWidth = 405; // ширина активного слайда
    const smallItemWidth = 350; // ширина неактивных
    const gap = 31;
    let isAnimating = false;

    function calculateOffset() {
      try {
        const wrapper = document.querySelector('.slider__wrapper');
        if (!wrapper) {
          console.warn('Slider: Элемент .slider__wrapper не найден');
          return 0;
        }
        
        const wrapperWidth = wrapper.offsetWidth;

        let offset = 0;
        for (let i = 0; i < currentIndex; i++) {
          offset += smallItemWidth + gap;
        }

        const center = (wrapperWidth - itemWidth) / 2;
        return -offset + center;
      } catch (error) {
        console.error('Slider: Ошибка при расчете смещения:', error);
        return 0;
      }
    }

    function updateSlider() {
      if (isAnimating) return;
      
      try {
        isAnimating = true;

        const total = sliderItems.length;
        const prevIndex = (currentIndex - 1 + total) % total;
        const nextIndex = (currentIndex + 1) % total;

        sliderItems.forEach((item) => {
          item.classList.remove('prev', 'active', 'next');
        });

        sliderItems[prevIndex].classList.add('prev');
        sliderItems[currentIndex].classList.add('active');
        sliderItems[nextIndex].classList.add('next');

        const offset = calculateOffset();
        sliderTrack.style.transform = `translateX(${offset}px)`;

        dots.forEach((dot, index) => {
          dot.classList.toggle('slider__dot--active', index === currentIndex);
        });

        setTimeout(() => {
          isAnimating = false;
        }, 600);
      } catch (error) {
        console.error('Slider: Ошибка при обновлении слайдера:', error);
        isAnimating = false;
      }
    }

    function goToNext() {
      try {
        currentIndex = (currentIndex + 1) % sliderItems.length;
        updateSlider();
      } catch (error) {
        console.error('Slider: Ошибка при переходе к следующему слайду:', error);
      }
    }

    function goToPrev() {
      try {
        currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
        updateSlider();
      } catch (error) {
        console.error('Slider: Ошибка при переходе к предыдущему слайду:', error);
      }
    }

    // Добавляем обработчики событий с проверкой ошибок
    nextButton.addEventListener('click', goToNext);
    prevButton.addEventListener('click', goToPrev);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        try {
          if (index !== currentIndex && !isAnimating) {
            currentIndex = index;
            updateSlider();
          }
        } catch (error) {
          console.error('Slider: Ошибка при клике на точку:', error);
        }
      });
    });

    // Инициализация слайдера
    updateSlider();
    
    // Обработчик изменения размера окна с debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateSlider();
      }, 150);
    });

  } catch (error) {
    console.error('Slider: Критическая ошибка при инициализации:', error);
  }
}); 