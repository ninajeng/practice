import { createRouter, createWebHashHistory } from 'vue-router';
import UserLayout from '@/views/user/LayoutView.vue';
import HomeView from '@/views/user/HomeView.vue';
import UserProductsView from '@/views/user/ProductsView.vue';
import UserProductItemView from '@/views/user/ProductItemView.vue';
import UserCartView from '@/views/user/CartView.vue';

import AdminLayout from '@/views/admin/LayoutView.vue';
import AdminLoginView from '@/views/admin/LoginView.vue';
import AdminProductsView from '@/views/admin/ProductsView.vue';
import AdminCouponsView from '@/views/admin/CouponsView.vue';

const webName = 'Juice Oasis';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: UserLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
          meta: {
            title: webName,
          },
        },
        {
          path: 'products',
          name: 'products',
          component: UserProductsView,
          meta: {
            title: `${webName} - 產品列表`,
          },
        },
        {
          path: 'product/:id',
          component: UserProductItemView,
          meta: {
            title: `${webName} - 產品細節`,
          },
        },
        {
          path: 'cart',
          name: 'cart',
          component: UserCartView,
          meta: {
            title: `${webName} - 購物車`,
          },
        },
      ],
    },
    {
      path: '/admin',
      component: AdminLayout,
      redirect: {
        name: 'adminLogin',
      },
      children: [
        {
          path: 'login',
          name: 'adminLogin',
          component: AdminLoginView,
          meta: {
            title: `${webName} - 後台登入`,
          },
        },
        {
          path: 'products',
          name: 'adminProducts',
          component: AdminProductsView,
          meta: {
            title: `${webName} 後台 - 產品列表`,
          },
        },
        {
          path: 'coupons',
          name: 'adminCoupons',
          component: AdminCouponsView,
          meta: {
            title: `${webName} 後台 - 優惠卷列表`,
          },
        },
      ],
    },
  ],
  linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
