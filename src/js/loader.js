const icon = document.querySelector('.loader__icon');
const wrapper = document.querySelector('.loader__wrapper');

export const showLoader = (message = 'Loading...') => {
  wrapper.classList.remove('is-hidden');
  wrapper.classList.add('loader__wrapper--visable');
  icon.classList.add('rotate-center');
  document.querySelector('.loader__message').textContent = message;
};
export const removeLoader = () => {
  wrapper.classList.remove('loader__wrapper--visable');
  setTimeout(() => {
    wrapper.classList.add('is-hidden');
    icon.classList.remove('rotate-center');
  }, 200);
};
