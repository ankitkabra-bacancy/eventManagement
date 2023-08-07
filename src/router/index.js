// Composables
import store from '@/store';
import user from '@/store/modules/userprofile';
import { createRouter, createWebHistory } from 'vue-router'



const routes = [
  {
    path: '/',
    component: () => import('@/layouts/layout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Front/Home.vue'),
      },
    ],
  },
  {
    path : '/admin',
    component: () => import(/* webpackChunkName: "Admin" */ '@/views/Admin/Admin.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'admin.dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/Admin/Dashboard.vue'),
      },
      {
        path: 'users',
        name: 'admin.users',
        component: () => import(/* webpackChunkName: "Users" */ '@/views/Admin/Users.vue'),
      },
      {
        path: 'events',
        name: 'admin.events',
        component: () => import(/* webpackChunkName: "AllEvents" */ '@/views/Admin/AllEvents.vue'),
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});



router.beforeEach((to, from, next) => {
  
  const userRole = store.state.userDetail.user ? store.state.userDetail.user.role : '';

  if (to.path.startsWith('/admin')) {
  
    // Fetch the user role using your authentication function (e.g., getUserRole())
     // Make sure this function returns the user's role
    
    if (typeof userRole !== 'undefined' && userRole == 'admin') {
      // If the user is an admin, allow navigation to the admin route
      next();
    } else {
      store.dispatch('updateErrorSnackBar',{status : true, msg : 'Unauthorized access !'});
      // If the user is not an admin, redirect to another page (e.g., login or home)
      next('/'); // Redirect to the home page in this example
    }
  } else {
    next();
  }
});



export default router
