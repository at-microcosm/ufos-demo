import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = createRoot(document.getElementById('root')!);

const wrap = hash => (
  <StrictMode>
    <App hash={hash} />
  </StrictMode>
);

root.render(wrap());
window.onhashchange = () => root.render(wrap(window.location.hash.slice(1)));

