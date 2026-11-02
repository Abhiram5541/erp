// Build-time render of the page markup, injected into dist/index.html by scripts/prerender.mjs
// so search engines and link previews see real content instead of an empty <div id="root">.
import { renderToString } from 'react-dom/server';
import { Page } from './App';

export const render = () => renderToString(<Page />);
