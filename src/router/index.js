import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: require('@/components/signin').default
    },
    {
      path: '/dashboard',
      name: 'HelloWorld',
      component: require('@/components/signin').default
    }
  ]
})
