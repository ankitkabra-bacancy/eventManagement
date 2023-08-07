/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

import axiosInstance from 'axios';
import VueCookies from 'vue-cookies'


// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App);

const axios = axiosInstance.create({
    baseURL: import.meta.env.VITE_API_URL
});

app.provide('axios', axios);
app.provide('cookies', VueCookies);

registerPlugins(app);

app.mount('#app');
