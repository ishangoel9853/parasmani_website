import router from './index'

export default {
    guest (to, from, next) {
        if(window.localStorage.getItem('token') == null) {
          next()
        } else {
          router.push("/error")
        }
    },
    authAdmin (to, from, next) {
      console.log("Unauthorised")
      if(window.localStorage.getItem('token') != null) {
        if(window.localStorage.getItem('kind') == 'admin') {
          next()
        } else {
          router.push("/error")
        }
      } else {
        router.push("/error")
      }
    },
    authStudent (to, from, next) {
      if(window.localStorage.getItem('token') != null) {
        if(window.localStorage.getItem('kind') == 'student') {
          next()
        } else {
          router.push("/error")
        }
      } else {
        router.push("/error")
      }
    }
}
