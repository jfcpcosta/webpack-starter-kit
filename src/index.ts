import './styles/main.scss'

import { greeting } from './greeting'
import Router, { RouterMode } from './router';

const content = document.querySelector('code#message');

const router = new Router({
    mode: RouterMode.HASH,
    root: '/'
});

router
  .add(/about/, () => content.textContent = 'welcome in about page')
  .add(/products\/(.*)\/specification\/(.*)/, (id, specification) => content.textContent = `products: ${id} specification: ${specification}`)
  .add('', () => content.textContent = greeting('John Doe'));

document.querySelectorAll('a').forEach(link => {
    router.navigate(link.href);
    return false;
});