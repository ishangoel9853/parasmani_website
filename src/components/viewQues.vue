
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

  <template>
    <div>
      <v-data-table
        :headers="headers"
        :items="quesList"
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
          <td class="text-xs-right">{{ props.item.id }}</td>
          <td class="text-xs-right">{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item.options.A.value }}</td>
          <td class="text-xs-right">{{ props.item.options.B.value }}</td>
          <td class="text-xs-right">{{ props.item.options.C.value }}</td>
          <td class="text-xs-right">{{ props.item.options.D.value }}</td>
          <td class="text-xs-right">{{ props.item.subject }}</td>
          <td class="text-xs-right">{{ props.item.correct }}</td>
        </template>
        <template slot="pageText" slot-scope="props">
          Questions {{ props.pageStart }} - {{ props.pageStop }} out of {{ props.itemsLength }}
        </template>
      </v-data-table>
    </div>
  </template>

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
     set: 0,
     setList: [],
     headers: [
         {
           text: 'Question ID',
           align: 'left',
           value: 'id',
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
     response.data.question_papers.forEach((val) => {
       this.langList.push(val.language)

       let ak = response.data.answerkey.find(function (obj) { return obj.language == val.language});
       let i = 1

       val.A.forEach((q) => {
         let k = ak.answers.find(function (obj) { return obj.question_id == q._id})
         q['correct'] = k.answer_id
         q['id'] = i++;
       })
       val.B.forEach((q) => {
         let k = ak.answers.find(function (obj) { return obj.question_id == q._id})
         q['correct'] = k.answer_id
         q['id'] = i++;
       })
       val.C.forEach((q) => {
         let k = ak.answers.find(function (obj) { return obj.question_id == q._id})
         q['correct'] = k.answer_id
         q['id'] = i++;
       })
       val.D.forEach((q) => {
         let k = ak.answers.find(function (obj) { return obj.question_id == q._id})
         q['correct'] = k.answer_id
         q['id'] = i++;
       })
       this.exam[val.language] = {}
       this.exam[val.language]['A'] = val.A
       this.exam[val.language]['B'] = val.B
       this.exam[val.language]['C'] = val.C
       this.exam[val.language]['D'] = val.D

     })
     this.setList.push('A','B','C','D')

     this.langID = this.langList[0]
     this.set = this.setList[0]

     this.quesList = this.exam[this.langID][this.set]
     this.loaded = true
   }).catch((err) => {
     this.error = err.toString()
     this.dialog = true
   })
 },
 watch: {
   langID: function(){
     this.quesList = this.exam[this.langID][this.set]
   },
   set: function() {
     this.quesList = this.exam[this.langID][this.set]
   }
 }
}
</script>

<style lang="css">
  .width-quest {
    width: 100em!important
  }
</style>
