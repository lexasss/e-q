import Vue from 'vue';
import App from './App.vue';

import '@/assets/main.scss';
import store from '@/services/storage';

Vue.config.productionTip = false;

new Vue({
    store,
    render: (h) => h(App),
}).$mount('#app');
