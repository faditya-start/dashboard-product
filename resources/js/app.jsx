import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import LoadingIndicator from './Components/LoadingIndicator';

createInertiaApp({
    title: (title) => `${title} - Dashboard Product`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        delay: 250,
        color: '#6366f1',
        includeCSS: false,
        showSpinner: true,
        render: () => <LoadingIndicator />
    },
}).then(() => {
    console.log('App initialized');
}); 