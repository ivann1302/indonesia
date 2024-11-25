const backToTop = document.getElementById('back-to-top');

backToTop.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('hi!!')
    window.scrollTo({ top: 0, behavior: 'smooth' })        
});

export default backToTop;