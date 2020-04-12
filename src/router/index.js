import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Menu from '../views/Menu.vue'
import Categories from "../views/Categories";
import MenuItems from "../views/MenuItems";

Vue.use(VueRouter);
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
    component: Categories
  },
  {
    path: '/items',
    name: 'MenuItems',
    component: MenuItems
  },
  {
    path: '/edit/category/:id',
    name: 'edit-category',
    props: parseProps,
    component: () => import(/* webpackChunkName: "core" */ '../views/EditCategory.vue')
  },
  {
    path: '/edit/item/:id',
    name: 'edit-item',
    props: parseProps,
    component: () => import(/* webpackChunkName: "core" */ '../views/EditMenuItems.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
