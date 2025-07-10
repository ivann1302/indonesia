const backToTop = document.getElementById('back-to-top');

if (backToTop) {
  backToTop.addEventListener('click', function(event) {
    try {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('BackToTop: Ошибка при прокрутке:', error);
      // Fallback для старых браузеров
      window.scrollTo(0, 0);
    }
  });
} else {
  console.warn('BackToTop: Элемент #back-to-top не найден');
}

export default backToTop;