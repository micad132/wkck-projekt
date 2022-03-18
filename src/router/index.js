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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    
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
