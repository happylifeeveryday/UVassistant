import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ViewUVIndex from '../views/UVIndexView.vue'
import EffectsOfSunExposure from '../views/EffectsOfSunExposureView.vue'
import AgeCategoryDetails from '../views/AgeCategoryDetailsView.vue'
import AgeCategoryDetailsView from '@/views/AgeCategoryDetailsView.vue'
import ReminderView from '@/views/ReminderView.vue'
import PersonalMeasure from '@/views/PersonalMeasureView.vue'
import ImpactView from '@/views/ImpactView.vue'
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
      path: '/Reminder',
      name: 'Reminder',
      component: ReminderView,
    },
    {
      path: '/PersonalMeasure',
      name: 'PersonalMeasure',
      component: PersonalMeasure,
    },
    {
      path: '/EffectsOfSunExposure/:ageGroup',
      name: 'AgeCategoryDetails',
      component: AgeCategoryDetailsView,
      props: true,
    },
    {
      path: '/EffectsOfSunExposure',
      name: 'EffectsOfSunExposure',
      component: EffectsOfSunExposure,
    },
    {
      path: '/ImpactView',
      name: 'ImpactView',
      component: ImpactView,
    },
  ],
})

export default router
