import React from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './pages/HomeEN.jsx';
import './pages/HomeEN.css';

createRoot(document.getElementById('root')).render(<HomePage />);

// Ao chegar por um link como "/#sobre" (vindo da página do case),
// rola até a seção depois que a página terminar de montar.
if (window.location.hash) {
  const id = decodeURIComponent(window.location.hash.slice(1));
  const go = () => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
  };
  requestAnimationFrame(() => requestAnimationFrame(go));
  window.addEventListener('load', go, { once: true });
}
