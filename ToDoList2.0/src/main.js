/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import store from './store';  // Import the store

const app = createApp(App)
app.use(store);  // Use the store
// ... other plugins or configurations you have ...


registerPlugins(app)

app.mount('#app')
