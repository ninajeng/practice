import { createApp } from 'vue';
import { createPinia } from 'pinia';

import axios from 'axios';
import VueAxios from 'vue-axios';

import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import * as AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import SweetAlert from '@/components/SweetAlert.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import * as $cookie from '@/utils/cookie';
import * as $adminRequest from '@/utils/adminRequest';
import * as $filters from '@/utils/filters';
import * as $productTemplate from '@/utils/productTemplate';

import App from './App.vue';
import router from './router';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');

const app = createApp(App);

app.config.globalProperties.$cookie = $cookie;
app.config.globalProperties.$adminRequest = $adminRequest;
app.config.globalProperties.$filters = $filters;
app.config.globalProperties.$productTemplate = $productTemplate;

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);

app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);
app.component('LoadingView', Loading);
app.component('SweetAlert', SweetAlert);

app.mount('#app');
