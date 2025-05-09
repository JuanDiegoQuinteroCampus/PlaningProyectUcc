import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from './Components/Toaster';
import { ToastProvider } from '@radix-ui/react-toast'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { LoaderProvider } from './Components/LoaderProvider';

const appName = import.meta.env.VITE_APP_NAME || 'Planing Project';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ToastProvider swipeDirection="right">
                <LoaderProvider>
                    <App {...props} />
                    <Toaster />
                </LoaderProvider>
            </ToastProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
