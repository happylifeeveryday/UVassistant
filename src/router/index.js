import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ViewUVIndex from '../views/UVIndexView.vue'
import EffectsOfSunExposure from '../views/EffectsOfSunExposureView.vue'
import AgeCategoryDetails from '../views/AgeCategoryDetailsView.vue'
import AgeCategoryDetailsView from '@/views/AgeCategoryDetailsView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/ViewUVIndex',
      name: 'ViewUVIndex',
      component: ViewUVIndex,
    },
    {
      path: '/EffectsOfSunExposure/:ageGroup',
      name: 'AgeCategoryDetails',
      component: AgeCategoryDetailsView,
      props: true  
    },
    {
      path: '/EffectsOfSunExposure',
      name: 'EffectsOfSunExposure',
      component: EffectsOfSunExposure,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
