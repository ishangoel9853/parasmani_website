<template lang="html">
  <v-app id="inspire">
    <h1 class="mt-3">Instructions : </h1>
    <p class="textarea" v-html="exam.instruction"></p>
    <h1 class="mt-3">Languages : </h1>
    <span class="textarea" v-for="item in exam.question_papers">{{item.language}}</span>
    <h1 class="mt-3">Subjects : </h1>
    <span class="textarea" v-for="item in exam.subjects">
      <h3>{{item.title}}</h3> &nbsp&nbsp&nbsp  Set A : {{item.num_in_set_A}} | Set B : {{item.num_in_set_B}} | Set C : {{item.num_in_set_C}} | Set D : {{item.num_in_set_D}} |</span>
    <h1 class="mt-3">Batches : </h1>
    <span class="textarea" v-for="item in exam.batches" v-html="(new Date(item.start_time)).toUTCString().concat('<b> To </b>').concat((new Date(item.end_time)).toUTCString())"></span>

  </v-app>
</template>

<script>
import axios from '../axios'

export default {
  data() {
    return {
        exam: {}
    }
  },
  mounted: function() {
    const self = this
    axios.AuthAxios.get('/exam').then((response) => {
      self.exam = response.data
      console.log(self.exam)
    })
  }
}
</script>

<style lang="css">
.textarea {
  font-size: 1.1em;
}
</style>
