const burgerCheckbox = document.querySelector('#burger-checkbox');
const list = document.querySelector('.burger-menu__list');

if (burgerCheckbox && list) {
  burgerCheckbox.addEventListener('change', () => {
    try {
      // Управление состоянием через чекбокс и CSS
      if (burgerCheckbox.checked) {
        list.style.transform = 'translateX(-100%)';
        list.style.display = 'grid';
      } else {
        list.style.display = 'none';
      }
    } catch (error) {
      console.error('BurgerMenu: Ошибка при переключении меню:', error);
    }
  });
} else {
  console.warn('BurgerMenu: Не найдены необходимые элементы для работы бургер-меню');
}

export default burgerCheckbox;