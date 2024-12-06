const buttons = document.querySelectorAll('.steps__button');

buttons.forEach(button => {
    button.addEventListener('click', function () {
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
            console.warn('No .steps__description found for this button');
        }
    });
});

export default buttons;
