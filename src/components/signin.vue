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
  </v-app>
</template>

<script>
  const home = "https://intense-scrubland-78603.herokuapp.com/"
  const login = 'login'

  export default {
    data: () => ({
      userId:'',
      password:'',
      drawer: null
    }),
    methods: {
      signIn(){
        let data = {
            password: this.password,
            userId: this.userId
        }
        this.$store.dispatch('signIn',data)
      }
    }
  }
</script>
