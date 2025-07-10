document.addEventListener('DOMContentLoaded', function() {
  // Получаем все навигационные ссылки в header
  const navLinks = document.querySelectorAll('.header__link');
  const logoLink = document.querySelector('.header__logo a');
  
  // Функция плавной прокрутки
  function smoothScrollTo(targetElement) {
    if (targetElement) {
      try {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      } catch (error) {
        console.error('SmoothNavigation: Ошибка при прокрутке:', error);
        // Fallback для старых браузеров
        targetElement.scrollIntoView();
      }
    }
  }

  // Обработчик для навигационных ссылок
  if (navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        try {
          event.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          smoothScrollTo(targetElement);
        } catch (error) {
          console.error('SmoothNavigation: Ошибка при обработке клика:', error);
        }
      });
    });
  }

  // Обработчик для логотипа (прокрутка наверх)
  if (logoLink) {
    logoLink.addEventListener('click', function(event) {
      try {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error('SmoothNavigation: Ошибка при прокрутке наверх:', error);
        // Fallback для старых браузеров
        window.scrollTo(0, 0);
      }
    });
  }

  // Обработчик для ссылок в бургер-меню
  const burgerLinks = document.querySelectorAll('.burger-menu__item');
  if (burgerLinks.length > 0) {
    burgerLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        try {
          event.preventDefault();
          
          // Закрываем бургер-меню
          const burgerCheckbox = document.querySelector('#burger-checkbox');
          if (burgerCheckbox) {
            burgerCheckbox.checked = false;
          }
          
          // Определяем целевую секцию на основе текста ссылки
          const linkText = this.textContent.toLowerCase().trim();
          let targetId = '';
          
          switch(linkText) {
            case 'destination':
              targetId = '#destination';
              break;
            case 'experiences':
              targetId = '#experiences';
              break;
            case 'about':
              targetId = '#about';
              break;
            case 'gallery':
              targetId = '#gallery';
              break;
            case 'contact':
              targetId = '#contact';
              break;
            default:
              return;
          }
          
          const targetElement = document.querySelector(targetId);
          smoothScrollTo(targetElement);
        } catch (error) {
          console.error('SmoothNavigation: Ошибка при обработке бургер-меню:', error);
        }
      });
    });
  }
});

export default true; 