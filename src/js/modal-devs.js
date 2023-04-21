const modalDevLink = document.querySelector('.footer-highlight');
const modalDevWindow = document.querySelector('.modal-devs');
const btns = document.querySelectorAll("[data-slider-button]");

export function openModalDevs() {
  modalDevWindow.classList.remove('modal-devs-hidden');
}

export function closeModalDevs() {
  modalDevWindow.classList.add('modal-devs-hidden');
}

btns.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.sliderButton === "next" ? 1: -1;
        const slides = button.closest(".modal-devs__slider").querySelector(".modal-devs__slide-list");
        const activeSlide = slides.querySelector('[data-active]');
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if (newIndex <0) newIndex = slides.children.length -1
        if (newIndex >= slides.children.length) newIndex = 0;

        slides.children[newIndex].dataset.active= true;
        delete activeSlide.dataset.active

    })
})

modalDevLink.addEventListener('click', openModalDevs);
window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeModalDevs();
    }
  });
