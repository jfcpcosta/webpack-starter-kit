import './styles/main.scss';
import { greeting } from './greeting'

document.querySelector('code#message').textContent = greeting('John Doe');
