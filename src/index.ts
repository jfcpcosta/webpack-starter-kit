import './styles/main.scss'

import Router, { RouterMode } from './core/router';
import { About } from './pages/about';
import { Home } from './pages/home';

const root = document.querySelector('#root');

const router = new Router({
    mode: RouterMode.HASH,
    root: '/'
});

router
  .add(/about/, () => new About(root).render())
  // .add(/products\/(.*)\/specification\/(.*)/, (id, specification) => content.textContent = `products: ${id} specification: ${specification}`)
  .add('', () => new Home(root).render());

document.querySelectorAll('a').forEach(link => {
    router.navigate(link.href);
    return false;
});