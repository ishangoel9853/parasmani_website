<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md8>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <br>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" v-model="userId" type="text"></v-text-field>
                  <br>
                  <v-text-field prepend-icon="lock" name="password" label="Password"  v-model="password" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <br>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="signIn">Login</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
              <br>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <h2>Error</h2>
          </v-card-title>
          <v-card-text>
            {{error}}
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="dialog=false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-app>
</template>

<script>
import http from '../axios'
import router from '../router'

  export default {
    data: () => ({
      userId:'',
      password:'',
      drawer: null,
      dialog: false,
      error: ''
    }),
    methods: {
      signIn(){
        http.NotAuthAxios.post('login', {
          userId: this.userId,
          password: this.password
        }).then((response) => {
          console.log(response.data)
          window.localStorage.setItem('token', response.data.token)
          console.log(response.data.user)
          window.localStorage.setItem('kind',response.data.user.kind)
          router.push('/adminDashboard')
        }).catch((err) => {
          this.error = err.toString()
          this.dialog = true
          console.log(this.err)
        })
      }
    }
  }
</script>
