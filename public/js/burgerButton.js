const burger = document.querySelector('.header__burger-menu');

 burger.addEventListener('click', () => {
    burger.classList.toggle('active');
});

export default burger;
