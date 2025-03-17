import './assets/main.css'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getFunctions } from 'firebase/functions'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

initializeApp(firebaseConfig)
const functions = getFunctions(undefined, 'australia-southeast1')
export { functions }
const app = createApp(App)
app.use(router)
app.use(Toast, {
  position: POSITION.TOP_CENTER,
  timeout: 6000,
  hideProgressBar: false,
})
app.mount('#app')
