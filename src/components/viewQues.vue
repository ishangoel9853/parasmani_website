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

<!--
  <v2-table :data="quesList">

    <v2-table-column label="ID" prop="ID"></v2-table-column>

    <v2-table-column label="Question" prop="title"></v2-table-column>

    <v2-table-column label="Opt1" prop="options['A']"></v2-table-column>
    <v2-table-column label="Opt2" prop="options.B.value"></v2-table-column>
    <v2-table-column label="Opt3" prop="options.C.value"></v2-table-column>
    <v2-table-column label="Opt4" prop="options.D.value"></v2-table-column>
    <v2-table-column label="Subject" prop="subject"></v2-table-column>

    <v2-table-column label="Correct" prop="Correct"></v2-table-column>
  </v2-table>
-->
<v-data-table
  :headers="headers"
  :items="quesList"
  :search="search"
  :pagination.sync="pagination"
  hide-actions
  class="elevation-1"
>
  <template slot="headerCell" slot-scope="props">
    <v-tooltip bottom>
      <span slot="activator">
        {{ props.header.text }}
      </span>
      <span>
        {{ props.header.text }}
      </span>
    </v-tooltip>
  </template>
    <template slot="items" slot-scope="props">
      <!-- <td>{{ props.item.name }}</td> -->
      <td class="text-xs-right">{{ props.item._id }}</td>
      <td class="text-xs-right">{{ props.item.title}}</td>
      <td class="text-xs-right">{{ props.item.options.A.value }}</td>
      <td class="text-xs-right">{{ props.item.options.B.value }}</td>
      <td class="text-xs-right">{{ props.item.options.C.value }}</td>
      <td class="text-xs-right">{{ props.item.options.D.value }}</td>

      <td class="text-xs-right">{{ props.item.subject }}</td>
      <td class="text-xs-right">{{ props.item.correct }}</td>
    </template>
  </v-data-table>
  <div class="text-xs-center pt-2">
    <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
  </div>


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
     search: '',
     pagination: {},
     langID: 0,
     langList: [],
     set: null,
     setList: [],
     headers: [
         {
           text: 'Question ID',
           align: 'left',
           value: '_id',
         },
         { text: 'Question', value: 'title', class:'width-quest' },
         { text: 'Option A', value: 'options.A.value' },
         { text: 'Option B', value: 'options.B.value' },
         { text: 'Option C', value: 'options.C.value' },
         { text: 'Option D', value: 'options.D.value' },
         { text: 'Subject', value: 'subject' },
         { text: 'Correct Ans', value: 'correct' },
       ],
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
   },
   pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
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
  .width-quest {
    width: 100em!important
  }
</style>
