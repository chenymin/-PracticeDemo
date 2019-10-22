// https://medium.com/@toastui/using-proxy-and-virtual-dom-to-build-your-own-framework-43ce9ddec81d
import View from './js/view';

const container = document.createElement('div');
document.body.appendChild(container);

new View(container);
