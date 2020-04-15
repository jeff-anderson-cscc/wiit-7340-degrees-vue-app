import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import Categories from "../views/Categories";
import MenuItems from "../views/MenuItems";
import Auth from '@okta/okta-vue'
import {OAUTH_ISSUER, CLIENT_ID} from '../shared/config';

Vue.use(VueRouter);

Vue.use(Auth, {
  issuer: `${OAUTH_ISSUER}`,
  clientId: `${CLIENT_ID}`,
  redirectUri: window.location.origin + '/implicit/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
});

const parseProps = r => ({ id: parseInt(r.params.id) });

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/items',
    name: 'MenuItems',
    component: MenuItems,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/edit/category/:id',
    name: 'edit-category',
    props: parseProps,
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "core" */ '../views/EditCategory.vue')
  },
  {
    path: '/edit/item/:id',
    name: 'edit-item',
    props: parseProps,
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "core" */ '../views/EditMenuItems.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/implicit/callback',
    component: Auth.handleCallback()
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
