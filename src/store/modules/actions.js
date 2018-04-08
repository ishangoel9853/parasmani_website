import router from '../../router'
import http from '../../axios';

const LOGIN = 'login'

export default {
  signIn({context,state}, data){
    http.NotAuthAxios.post(LOGIN,
      data
    ).then((response) => {
      console.log(response.data)
      sessionStorage.setItem('token',response.data.token)
      sessionStorage.setItem('kind',response.data.kind)
      router.push('/adminDashboard')
    })
  }
}
