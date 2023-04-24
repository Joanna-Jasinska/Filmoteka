const modalDevsLink = document.querySelector('.footer-highlight');
const modalDevsWindow = document.querySelector('.modal-devs');
const modalDevsBtns = document.querySelectorAll('[data-slider-button]');
const modalDevsImages = [...document.querySelectorAll('.modal-devs__slide')];

export function openModalDevs() {
  modalDevsWindow.classList.remove('modal-devs-hidden');
}

export function closeModalDevs() {
  modalDevsWindow.classList.add('modal-devs-hidden');
}

modalDevsBtns.forEach(button => {
  button.addEventListener('click', () => {
    const btnMoves = button.dataset.sliderButton === 'next' ? 1 : -1;
    const slides = button.closest('.modal-devs__slider').querySelector('.modal-devs__slide-list');
    const activeSlide = slides.querySelector('[data-active]');
    let newIndex = [...slides.children].indexOf(activeSlide) + btnMoves;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });
});

modalDevsBtns.forEach(button => {
  button.addEventListener('click', () => {
    const btnMoves = button.dataset.sliderButton === 'next' ? 1 : -1;
    navImages(btnMoves);
  });
});

export function navImages(btnMoves) {
  const activeImage = document.querySelector('.modal-devs__slide[data-active]');
  if (!activeImage) {
    return;
  }
  let newIndex = modalDevsImages.indexOf(activeImage) + btnMoves;
  if (newIndex < 0) newIndex = modalDevsImages.length - 1;
  if (newIndex >= modalDevsImages.length) newIndex = 0;

  activeImage.removeAttribute('data-active');
  modalDevsImages[newIndex].setAttribute('data-active', '');
}

window.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    navImages(-1);
  } else if (event.key === 'ArrowRight') {
    navImages(1);
  }
});

modalDevsLink.addEventListener('click', openModalDevs);
window.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModalDevs();
  }
});
window.addEventListener('click', event => {
  if (event.target.classList.contains('modal-devs')) {
    closeModalDevs();
  }
});
