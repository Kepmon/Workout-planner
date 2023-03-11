/* eslint-disable import/no-extraneous-dependencies */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import MasonryWall from '@yeger/vue-masonry-wall'
import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

import App from './App.vue'
import router from './router'

import './index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(MasonryWall)
app.use(LoadingPlugin)

app.mount('#app')
