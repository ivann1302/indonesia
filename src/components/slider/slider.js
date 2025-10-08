document.addEventListener('DOMContentLoaded', function () {
  try {
    // Проверяем, что мы на десктопе (ширина экрана больше 768px)
    if (window.innerWidth <= 768) {
      console.log('Slider: Мобильная версия - слайдер отключен');
      return;
    }

    const sliderTrack = document.querySelector('.slider__track');
    const sliderItems = Array.from(document.querySelectorAll('.slider__item'));
    const prevButton = document.querySelector('.slider__button--prev');
    const nextButton = document.querySelector('.slider__button--next');
    const dots = Array.from(document.querySelectorAll('.slider__dot'));

    // Проверяем наличие всех необходимых элементов
    if (!sliderTrack || !sliderItems.length || !prevButton || !nextButton || !dots.length) {
      console.warn('Slider: Не найдены необходимые элементы для работы слайдера');
      return;
    }

    let currentIndex = 0;
    let isAnimating = false;
    const totalSlides = sliderItems.length;

    // Инициализация слайдера
    function initSlider() {
      updateSlider();
    }

    // Обновление отображения слайдера
    function updateSlider() {
      if (isAnimating) return;
      
      try {
        isAnimating = true;

        // Убираем все классы активности
        sliderItems.forEach((item) => {
          item.classList.remove('active');
        });

        // Рассчитываем индексы для кругового отображения
        const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        const nextIndex = (currentIndex + 1) % totalSlides;

        // Скрываем все слайды
        sliderItems.forEach((item) => {
          item.style.display = 'none';
        });

        // Создаем виртуальную структуру: [prev, active, next]
        // Активный слайд ВСЕГДА в позиции 1 (по центру)
        const virtualSlides = [prevIndex, currentIndex, nextIndex];
        
        // Показываем слайды в правильном порядке
        virtualSlides.forEach((slideIndex, position) => {
          const slide = sliderItems[slideIndex];
          slide.style.display = 'block';
          slide.style.order = position;
          
          // Активный слайд всегда в позиции 1 (центр)
          if (position === 1) {
            slide.classList.add('active');
          }
        });

        // Обновляем точки навигации
        dots.forEach((dot, index) => {
          const isActive = index === currentIndex;
          dot.classList.toggle('slider__dot--active', isActive);
        });

        // Центрируем активный слайд
        centerActiveSlide();

        setTimeout(() => {
          isAnimating = false;
        }, 600);
      } catch (error) {
        console.error('Slider: Ошибка при обновлении слайдера:', error);
        isAnimating = false;
      }
    }

    // Центрирование активного слайда
    function centerActiveSlide() {
      const wrapper = document.querySelector('.slider__wrapper');
      if (!wrapper) return;
      
      const wrapperWidth = wrapper.offsetWidth;
      const activeWidth = 320; // Ширина активного слайда
      const sideWidth = 280; // Ширина боковых слайдов
      const gap = 20; // Отступ между слайдами
      
      // Активный слайд всегда в позиции 1 (центр виртуальной структуры)
      // Рассчитываем смещение так, чтобы активный слайд был строго по центру экрана
      const activePosition = sideWidth + gap; // Позиция активного слайда в группе [prev, active, next]
      const screenCenter = wrapperWidth / 2;
      const activeCenter = activePosition + (activeWidth / 2);
      
      // Смещаем трек так, чтобы центр активного слайда совпал с центром экрана
      const offset = screenCenter - activeCenter;
      sliderTrack.style.transform = `translateX(${offset}px)`;
    }

    // Переход к следующему слайду
    function goToNext() {
      if (!isAnimating) {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
      }
    }

    // Переход к предыдущему слайду
    function goToPrev() {
      if (!isAnimating) {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
      }
    }

    // Переход к конкретному слайду
    function goToSlide(index) {
      if (index !== currentIndex && !isAnimating && index >= 0 && index < totalSlides) {
        currentIndex = index;
        updateSlider();
      }
    }

    // Обработчики событий
    nextButton.addEventListener('click', goToNext);
    prevButton.addEventListener('click', goToPrev);

    // Обработчики для точек навигации
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });

    // Клавиатурная навигация
    document.addEventListener('keydown', function(e) {
      if (isAnimating) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
      }
    });

    // Инициализируем слайдер
    initSlider();

  } catch (error) {
    console.error('Slider: Критическая ошибка инициализации:', error);
  }
});