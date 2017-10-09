import VueRouter from 'vue-router';

let routes = [
    {
        path: '/asim/a/home',
        name: 'admin.home',
        component: require('./views/Admin/Home'),
    },
    {
        path: '/asim/a/users',
        name: 'admin.users',
        component: require('./views/Admin/Users'),
    },
    {
        path: '/asim/a/categories',
        name: 'admin.categories',
        component: require('./views/Admin/Categories'),
    },
    {
        path: '/asim/a/links',
        name: 'admin.links',
        component: require('./views/Admin/Links'),
    },
    {
        path: '/asim/a/pages',
        name: 'admin.pages',
        component: require('./views/Admin/Pages'),
    },
    // {
    //     path: '/a/users',
    //     name: 'admin.users',
    //     component: require('./views/Admin/Users'),
    // },

];

window.router = new VueRouter({
    hashbang: false,
    history: true,
    mode: 'history',
    routes,
    linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
// to and from are both route objects
// console.log(to);
//  console.log(from);
next(true);
});
