import router from './index'

export default {
    guest (to, from, next) {
        if(sessionStorage.getItem('token') == null) {
          next()
        } else {
          router.push("/error")
        }
    },
    authAdmin (to, from, next) {
      console.log("chut")
      if(sessionStorage.getItem('token') != null) {
        if(sessionStorage.getItem('kind') == 'admin') {
          next()
        } else {
          router.push("/error")
        }
      } else {
        router.push("/error")
      }
    },
    authStudent (to, from, next) {
      if(sessionStorage.getItem('token') != null) {
        if(sessionStorage.getItem('kind') == 'student') {
          next()
        } else {
          router.push("/error")
        }
      } else {
        router.push("/error")
      }
    }
}
