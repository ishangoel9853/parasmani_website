import router from '../../router'
import http from '../../axios';

const LOGIN = 'login'

export default {
  signIn({context,state}, data){
    http.NotAuthAxios.post(LOGIN,
      data
    ).then((response) => {
      sessionStorage.setItem('token',response.data)
      router.push('/adminDashboard')
    })
  }
}
