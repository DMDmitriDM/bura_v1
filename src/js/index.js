import '../css/no_postcss/normalize.css';
import '../css/ok_postcss/style.css';

import icon from '../assets/images/x_town.ico';

import createElements from './create-elements.js';
import { btnsClick } from './btns-click.js';

const linkIcon = document.createElement('link');
linkIcon.rel = 'icon';
linkIcon.type = 'image/x-icon';
linkIcon.href = icon;
document.head.append(linkIcon);

createElements();
btnsClick();

// document.addEventListener('DOMContentLoaded', () => {
//   const linkIcon = document.createElement('link');
//   linkIcon.rel = 'icon';
//   linkIcon.type = 'image/x-icon';
//   linkIcon.href = icon;
//   document.head.append(linkIcon);

//   createElements();
//   btnsClick();
// });
