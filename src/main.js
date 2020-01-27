import funcs from './pages/home.js';
import getUser from './pages/profile.js';
import Info from './pages/info.js';
import getMoreEvent from './pages/moreinfoevent.js';
import getFavorites from './pages/favorites.js';
import registerPage from './pages/register.js';
import login from './pages/login.js';

const main = document.querySelector('main');

function init() {
  const actualHash = window.location.hash;
  if (actualHash === '#profile') {
    getUser();
  } else if (actualHash === '#info') {
    main.innerHTML = Info();
  } else if (actualHash === '') {
    funcs.getEvents();
  } else if (actualHash === '#saibamais') {
    main.innerHTML = funcs.moreInfo();
  } else if (actualHash.includes('Tipo')) {
    funcs.getCategory('type', actualHash);
  } else if (actualHash.includes('Regiao')) {
    funcs.getCategory('region', actualHash);
  } else if (actualHash === '#salvos') {
    getFavorites();
  } else if (actualHash === '#register') {
    registerPage();
  } else {
    main.innerHTML = getMoreEvent(actualHash);
  }
}

window.addEventListener('hashchange', init);
window.addEventListener('load', init);

document.querySelectorAll('.home').forEach((btn) => {
  btn.addEventListener('click', () => {
    window.location.hash = '';
    // const selected = document.querySelectorAll('.selected')
    // selected.forEach(btn => btn.classList.remove('selected'))
    // btn.classList.add('selected');
  });
});

document.querySelectorAll('.info').forEach((btn) => {
  btn.addEventListener('click', () => {
    window.location.hash = 'info';
    // const selected = document.querySelectorAll('.selected')
    // selected.forEach(btn => btn.classList.remove('selected'))
    // btn.classList.add('selected');
  });
});

document.querySelectorAll('.login').forEach((element) => {
  element.addEventListener('click', (event) => {
    if (firebase.auth().currentUser == null) {
      $('#only-members-modal').modal('hide');
      $('#LoginModal').modal('show');
    } else {
      window.location.hash = event.currentTarget.id;
      //   const selected = document.querySelectorAll('.selected')
      //   selected.forEach(btn => btn.classList.remove('selected'))
      //   element.classList.add('selected');
    }
  });
});

document
  .querySelector('.google-login')
  .addEventListener('click', () => login.mediaLogin('google'));
document
  .querySelector('.facebook-login')
  .addEventListener('click', () => login.mediaLogin('facebook'));
document
  .querySelector('.btn-submit-login')
  .addEventListener('click', login.signIn);

document.querySelectorAll('.register').forEach((element) => {
  element.addEventListener('click', () => { window.location.hash = 'register'; });
});
