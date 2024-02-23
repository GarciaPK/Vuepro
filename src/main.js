/**
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'

import 'vuetify/dist/vuetify.css'

const app = createApp(App)
app.use(router)

const vuetify = createVuetify({
  theme: {
    primary: '#1976D2', // Color primario
    secondary: '#424242', // Color secundario
    accent: '#82B1FF', // Color de acento
    error: '#FF5252', // Color de error
  },
})

app.use(vuetify)

app.mount('#app')
 */

// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'

import 'vuetify/dist/vuetify.css'

const app = createApp(App)

const vuetify = createVuetify({
  theme: {
    primary: '#1976D2', 
    secondary: '#424242', 
    accent: '#82B1FF', 
    error: '#FF5252', 
  },
})

app.use(router)
app.use(vuetify)

app.mount('#app')




  