import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: require('@/components/signin').default
<<<<<<< HEAD
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
||||||| merged common ancestors
=======
    },
    {
      path: '/dashboard',
      name: 'HelloWorld',
      component: require('@/components/signin').default
>>>>>>> 36a0f21017f52aa2b4f987ad6d78648d94c2a631
    }
  ]
})
