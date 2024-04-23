import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import 'bootstrap/dist/css/bootstrap.css'; 
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

app.use(router);
app.use(pinia);
app.use(VueSweetalert2);
// Utilisez createPersistPlugin pour persister l'état de vos stores


app.mount('#app');