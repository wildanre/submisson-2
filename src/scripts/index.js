import './components/script.js';
import './utils/utils.js';
import './main.js';
import '../styles/main.scss';
import './views/pages/content-item.js';
import App from './views/app';

const app = new App({
  content: document.querySelector('#mainContent'),
});

// Event listener untuk merender halaman ketika URL hash berubah atau halaman dimuat
window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});
