import Handlebars from 'handlebars/runtime';
import button from './partials/btn.hbs';
import greet from './partials/greet.hbs';

Handlebars.registerPartial('button', button);

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');

  const result = greet({ username: 'John Snow' });
  root!.innerHTML = result;
});
