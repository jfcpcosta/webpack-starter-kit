import './styles/main.scss';
import { greeting } from './greeting'
import Router, { RouterMode } from './router';

const router = new Router({
    mode: RouterMode.HASH,
    root: '/'
});

router
  .add(/about/, () => {
    document.querySelector('code#message').textContent = 'welcome in about page';
  })
  .add(/products\/(.*)\/specification\/(.*)/, (id, specification) => {
    document.querySelector('code#message').textContent = `products: ${id} specification: ${specification}`;
  })
  .add('', () => {
    document.querySelector('code#message').textContent = greeting('John Doe');
  });

document.querySelectorAll('a').forEach(link => {
    router.navigate(link.href);
    return false;
});