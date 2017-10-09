import VueRouter from 'vue-router';

let routes = [

];

window.router = new VueRouter({
    hashbang: false,
    history: true,
    mode: 'history',
    routes,
    linkActiveClass: 'actived'
});

router.beforeEach((to, from, next) => {
  // to and from are both route objects
  // console.log(to);
  // console.log(from);
  next(true);
});
