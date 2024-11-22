import { createRouter, createWebHistory } from "vue-router";
import FormView from "../views/FormView.vue";
import PresentData from "../components/PresentData.vue";

const routes = [
    {
        path: "/",
        name: "Form",
        component: FormView,
    },
    {
        path: "/data",
        name: "Data",
        component: PresentData,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
