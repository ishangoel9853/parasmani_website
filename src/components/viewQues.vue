<!--
<template lang="html">
  <div id="app">
 <ul id="example-2">
 <li v-for="book in books">
 <b>{{ book.name }}</b> By <i>{{ book.author }}</i>
 <a v-if="isNotComplete(book)">DONE</a>
  <a href="#" @click.prevent = 'remove(book)'>DROP IT</a>
 </li>
 </ul>
</div>
</template>
-->

<template>
<v-app v-if="loaded">
  <v-select
    label="Language ID"
    v-model="langID"
    :items="langList"
    :rules="[v => !!v || 'Language is required']"
    required
  ></v-select>

  <v-select
    label="Set"
    v-model="set"
    :items="setList"
    :rules="[v => !!v || 'Set is required']"
    required
  ></v-select>


  <v2-table :data="quesList">

  <!-- <v2-table-column label="Language" prop="name"></v2-table-column>

    <v2-table-column label="Subject" prop="date"></v2-table-column>  -->
    <v2-table-column label="ID" prop="ID"></v2-table-column>

    <v2-table-column label="Question" prop="title"></v2-table-column>

    <v2-table-column label="Opt1" prop="options['A']"></v2-table-column>
    <v2-table-column label="Opt2" prop="options.B.value"></v2-table-column>
    <v2-table-column label="Opt3" prop="options.C.value"></v2-table-column>
    <v2-table-column label="Opt4" prop="options.D.value"></v2-table-column>
    <v2-table-column label="Subject" prop="subject"></v2-table-column>

    <v2-table-column label="Correct" prop="Correct"></v2-table-column>
  </v2-table>

  Enter the ID of the question to be removed:
  <v-text-field
    label="quesID"
    v-model="quesID"
    :rules="[v => !!v || 'Please enter a question ID.']"
    required
  ></v-text-field>
  <v-btn @click="remove(quesID)">Delete</v-btn>

</v-app>

</template>

<script>
import axios from '../axios'

export default {

 data() {
   return {
     langID: 0,
     langList: [],
     set: null,
     setList: [],
     quesList: [],
     quesID: null,
     loaded: false,
     exam: {}
  }
},
 methods: {

   remove: function(ques){
     console.log(ques);
     var idx = this.quesList.indexOf(ques)
     console.log('idx', idx)
     this.quesList.splice(idx,1)
   }
 },
 computed: {
   opt1: () => {
     return "hello"
   }
 },
 mounted: function() {
   const self = this
   axios.AuthAxios.get('/examAll').then((response) => {
     console.log(response.data)
     this.quesList = response.data.question_papers[0].A
     this.loaded = true
   })
 }
}
</script>

<style lang="css">
</style>
