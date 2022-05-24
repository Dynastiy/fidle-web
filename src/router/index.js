import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/layouts/homePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/sign-in',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/loginPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/registerPage.vue')
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/forgotPassword.vue')
  },
  {
    path: '/',
    // name: 'feeds',
    component: Home, 
    children:[
      {
        path: '/',
        // name: 'feeds',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/modules/feeds/indexPage.vue'),
        children: [
          {
            path: '/',
            name: 'feeds',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/modules/feeds/homeComponent.vue')
          },
          {
            path: '/explore',
            name: 'explore',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/modules/explore/indexPage.vue')
          },
          {
            path: '/wallet',
            name: 'wallet',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/modules/wallet/indexPage.vue')
          },
          {
            path: '/wallet/receive-funds/',
            name: 'receive-funds',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/modules/wallet/receiveFunds.vue')
          },
          {
            path: '/wallet/send-funds/',
            name: 'send-funds',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/modules/wallet/sendFunds.vue')
          },
          {
            path: '/profile',
            name: 'profile',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/modules/profile/indexView.vue'),
            children:[
              {
                path: '/profile',
                name: 'timeline',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/modules/profile/components/timelineView.vue')
              },
              {
                path: '/profile',
                name: 'transactions',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/modules/profile/components/transactionsView.vue')
              },{
                path: '/profile',
                name: 'levels',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/modules/profile/components/levelsView.vue')
              },
            ]
          },
        ]
      },
      
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
