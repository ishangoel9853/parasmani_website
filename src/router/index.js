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
      path: '/adminDashboard',
      name: 'HelloWorld',
      component: require('@/components/adminDashboard').default,
      children:[

        {
          path: '/',
          name: 'HelloWorld',
          component: require('@/components/adminHome').default,
        },
        {
          path: '/addAdmin',
          name: 'HelloWorld',
          component: require('@/components/addAdmin').default,
        }
      ]
    },
    {
      path: '/qAdderDashboard',
      name: 'HelloWorld',
      component: require('@/components/qAdderDashboard').default,
      children:[

        {
          path: '/',
          name: 'HelloWorld',
          component: require('@/components/qAdderHome').default,
        }
      ]
    }
  ]
})
