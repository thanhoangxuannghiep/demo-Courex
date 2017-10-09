
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


require('./bootstrap');
require('../plugins/jquery/jquery-2.1.1');
require('./main');
require('./mainDesktop');
require('./pluginBlock');
require('../plugins/slimscroll/jquery.slimscroll.min');
// require('../plugins/bootstrap/js/bootstrap.min');
// require('../plugins/pace/pace.min');
require('./form_error');
require('./form');
require('./window_route');
require('./float_title');
window.Vue = require('vue');
window.VueStrap = require('vue-strap');
window.debug_ = 0;
Vue.component('alert', VueStrap.alert);
Vue.component('modal', VueStrap.modal);
window.usersShared = {
    users: {},
    user:{}
};
Vue.component('admin-signin', require('./views/Admin/SignIn.vue'));
Vue.component('user-register', require('./views/Admin/Register.vue'));
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Vue.component('example', require('./components/Example.vue'));

const app = new Vue({
    el: '#wrapper'
});
