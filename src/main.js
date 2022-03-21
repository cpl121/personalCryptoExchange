import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/tailwind.css'
import router from './router'
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const app = createApp(App)

app.use(VueLoading)
app.use(router)

app.mount('#app')
