import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import VueRouter from 'vue-router';
import App from './App.vue';
import DeadlyNote from './components/DeadlyNote.vue';

window.CryptoJS = require('crypto-js');

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [

    {
      path: '/:id',
      name: 'reader',
      component: DeadlyNote,
    },
    {
      path: '/',
      name: 'home',
      component: DeadlyNote,
    },
  ],
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app');
