import Vue from 'vue';

import App from '@/components/App.vue';

import store from '@/services/storage';

import vuetify from './plugins/vuetify';

import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');
