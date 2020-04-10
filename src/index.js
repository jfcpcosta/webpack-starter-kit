import './styles/main.scss';
import { greeting } from './scripts/greeting'

document.querySelector('code#message').textContent = greeting('John Doe');