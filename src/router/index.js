import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ViewUVIndex from '../views/UVIndexView.vue'
import EffectsOfSunExposure from '../views/EffectsOfSunExposureView.vue'
import CommunityCategoryDetailsView from '@/views/CommunityCategoryDetailsView.vue'
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
      path: '/CommunityCategoryDetails/:communityGroup',
      name: 'CommunityCategoryDetails',
      component: CommunityCategoryDetailsView,
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, left: 0 }
    }
  }
})

export default router
