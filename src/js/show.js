const buttons = document.querySelectorAll('.steps__button');

if (buttons.length > 0) {
  buttons.forEach(button => {
    button.addEventListener('click', function () {
      try {
        // Находим ближайший родительский контейнер .steps__content
        const parentContent = this.closest('.steps__content');
        
        // Проверяем, есть ли внутри родительского контейнера .steps__description
        const text = parentContent?.querySelector('.steps__description');

        if (text) {
          // Переключаем класс `show` для отображения полного текста
          text.classList.toggle('show');

          // Меняем текст кнопки
          this.textContent = text.classList.contains('show') ? 'Show Less' : 'Show More';
        } else {
          console.warn('Show: Элемент .steps__description не найден для этой кнопки');
        }
      } catch (error) {
        console.error('Show: Ошибка при переключении текста:', error);
      }
    });
  });
} else {
  console.warn('Show: Элементы .steps__button не найдены');
}

export default buttons;
