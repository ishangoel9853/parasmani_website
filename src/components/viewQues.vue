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
<div>
  <v-select
    label="Language ID"
    v-model="langID"
    :items="langList"
    :rules="[v => !!v || 'Language is required']"
    required
  ></v-select>

  <v-select
    label="Subject"
    v-model="subject"
    :items="subjectList"
    :rules="[v => !!v || 'Subject is required']"
    required
  ></v-select>


  <v2-table :data="quesList">

  <!-- <v2-table-column label="Language" prop="name"></v2-table-column>

    <v2-table-column label="Subject" prop="date"></v2-table-column>  -->
    <v2-table-column label="ID" prop="ID"></v2-table-column>

    <v2-table-column label="Question" prop="Title"></v2-table-column>

    <v2-table-column label="Opt1" prop="Opt1"></v2-table-column>
    <v2-table-column label="Opt2" prop="Opt2"></v2-table-column>
    <v2-table-column label="Opt3" prop="Opt3"></v2-table-column>
    <v2-table-column label="Opt4" prop="Opt4"></v2-table-column>
    <v2-table-column label="Set" prop="Set"></v2-table-column>

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

  </div>

</template>

<script>
export default {

 data() {
   return {
     langID: 0,
     langList: [],
     subject: null,
     subjectList: [],
     quesList: [],
     quesID: null,
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
 mounted: function() {
   const self = this
   axios.AuthAxios.get('/languages').then((response) => {
     self.langList = response.data
   })
   axios.AuthAxios.get('/subjects').then((response) => {
     response.data.forEach(function(val) {
       self.subjectList.push(val.title)
     })
   })
 }
}
</script>

<style lang="css">
</style>
