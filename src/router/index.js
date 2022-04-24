import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import HelpView from '../views/HelpView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
	params: true
  },
  {
    path: '/about',
    name: 'about',
	component: LoginView,
	params: true
    
    
  },
  {
	  path: '/help',
	  name: 'help',
	  component: HelpView,
	  params: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
