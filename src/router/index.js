import { createRouter, createWebHistory } from "vue-router";
import FormView from "../views/FormView.vue";
import PresentData from "../components/PresentData.vue";
import LoginForm from "../components/LoginForm.vue";
import AdminProfile from "@/components/AdminProfile.vue";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
    {
        path: "/form",
        name: "Form",
        component: FormView,
        meta: { requiresAuth: true }, // This route requires authentication
    },
    {
        path: "/data",
        name: "Data",
        component: PresentData,
        meta: { requiresAuth: true }, // This route requires authentication
    },
    {
        path: "/",
        name: "Login",
        component: LoginForm,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: AdminProfile, 
      meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
// Navigation guard to check if the user is authenticated
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const auth = getAuth();

  if (requiresAuth) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next(); // User is authenticated, allow access to the page
      } else {
        next('/'); // Redirect to login if not authenticated
      }
    });
  } else {
    next(); // If route does not require auth, continue
  }
});
export default router;
