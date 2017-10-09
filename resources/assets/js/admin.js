
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./bootstrap');
Vue.use(require('v-toaster'), { timeout: 5000 });
require('./admin_routes');
require('../plugins/slimscroll/jquery.slimscroll.min');
require('../plugins/bootstrap/js/bootstrap.min');
require('../plugins/metisMenu/jquery.metisMenu');
require('../plugins/summernote/summernote.min');
require('../plugins/jquery/jquery-2.1.1');
require('../plugins/pace/pace.min');
require('./form_error');
require('./form');
require('./window_route');
require('./elements');
require('./float_title');
require('../plugins/dataTables/datatables.min');
// require('../plugins/datatables/js/dataTables.bootstrap.min');
window.Vue = require('vue');
window.VueStrap = require('vue-strap');
window.debug_ = 0;
window.DataTables = require('datatables.net');
Vue.component('alert', VueStrap.alert);
Vue.component('modal', VueStrap.modal);
Vue.component('admin-sidebar', require('./components/adminSidebar.vue'));
Vue.component('file-upload', require('./components/FileUpload'));
// Vue.component('customTable', require('./components/CustomTable'));
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
window.usersShared = {
    users: {},
    user:{}
};
window.sharedParams_ = {

};
window.loggedUser = currentUserId;

const admin = new Vue({
    el: '#wrapper',
    router: router,
    props: [

    ],
    data() {
        return {
            logout: new Form_(),
            shared_: sharedParams_,
            headerInfo: {},
            loggedUser: currentUserId
        }
    },
    methods: {

    },
    mounted() {

    },
    created() {
    },
    updated() {
        // window.TSC_.init();
    }
});