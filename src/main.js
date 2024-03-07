import 'mdb-vue-ui-kit/css/mdb.min.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import 'bootstrap/dist/css/bootstrap.css'; // Importez les styles CSS de Bootstrap
// import 'bootstrap-vue/dist/bootstrap-vue.css'; // Importez les styles CSS de Bootstrap Vue
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

// Créez l'application Vue
const app = createApp(App);

// Utilisez le routeur
app.use(router);

// Utilisez Bootstrap Vue et ses icônes (facultatif)
// app.use(BootstrapVue);
// app.use(IconsPlugin);

// Montez l'application
app.mount('#app');