const burgerCheckbox = document.querySelector('#burger-checkbox');
const list = document.querySelector('.burger-menu__list');

burgerCheckbox.addEventListener('change', () => {
  // Нет необходимости в JavaScript для управления состоянием, всё контролируется через чекбокс и CSS
  if (burgerCheckbox.checked) {
    list.style.transform = 'translateX(-100%)';
    list.style.display = 'grid';
  } else {
    list.style.display = 'none';
  }
});

export default burgerCheckbox;


/**
 *  const text = parentContent?.querySelector('.steps__description');

        if (text) {
            // Переключаем класс `show` для отображения полного текста
            text.classList.toggle('show');

            // Меняем текст кнопки
            this.textContent = text.classList.contains('show') ? 'Show Less' : 'Show More';
        } else {
            console.warn('No .steps__description found for this button');
        }
    });
});
 */