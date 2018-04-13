
<template>
<v-app v-if="loaded">
    <v-container  >
      <v-layout column>
      <v-data-table
        :headers="headers"
        :items="studentList"
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
          <td class="text-xs-right">{{ props.item._id }}</td>
          <td class="text-xs-right">{{ props.item.firstname }}</td>
          <td class="text-xs-right">{{ props.item.middleName }}</td>
          <td class="text-xs-right">{{ props.item.lastName }}</td>
          <td class="text-xs-right">{{ props.item.username }}</td>
          <td class="text-xs-right">{{ props.item.gender }}</td>
          <td class="text-xs-right">{{ props.item.batchStart }}</td>
          <td class="text-xs-right">{{ props.item.batchEnd }}</td>
          <td class="text-xs-right">{{ props.item.aadharNo }}</td>
          <td class="text-xs-right">{{ props.item.contactNo }}</td>
          <td class="text-xs-right">{{ props.item.email }}</td>
          <td class="text-xs-right">{{ props.item.eduQuali }}</td>
          <td class="text-xs-right">{{ props.item.marStats }}</td>
          <td class="text-xs-right">{{ props.item.jobExp }}</td>
          <td class="text-xs-right">{{ props.item.caste }}</td>
          <td class="text-xs-right">{{ props.item.category }}</td>
          <td class="text-xs-right">{{ props.item.income }}</td>
          <td class="text-xs-right">{{ props.item.religion }}</td>
          <td class="text-xs-right">{{ props.item.nationality }}</td>
        </template>
        <template slot="pageText" slot-scope="props">
          Questions {{ props.pageStart }} - {{ props.pageStop }} out of {{ props.itemsLength }}
        </template>
      </v-data-table>
      <div class="mt-5">
        Enter the ID of the question to be removed:
        <v-text-field
          label="studentID"
          v-model="studentID"
          :rules="[v => !!v || 'Please enter a student ID.']"
          required
        ></v-text-field>
        <v-btn @click="remove(studentID)">Delete</v-btn>
      </div>
</v-layout>
</v-container>

</v-app>

</template>

<script>
import axios from '../axios'

export default {

 data() {
   return {
     headers: [
         {
           text: 'ID',
           align: 'left',
           value: '_id',
         },
         { text: 'First Name', value: 'firstName' },
         { text: 'Middle Name', value: 'middleName' },
         { text: 'Last Name', value: 'lastName' },
         { text: 'Username', value: 'username' },
         { text: 'Gender', value: 'gender' },
         { text: 'Batch Start', value: 'batchStart' },
         { text: 'Batch End', value: 'batchEnd' },
         { text: 'Aadhar No.', value: 'aadharNo' },
         { text: 'Contact No.', value: 'contactNo' },
         { text: 'E-Mail', value: 'email' },
         { text: 'Educational Qualification', value: 'eduQuali' },
         { text: 'Marital Status', value: 'marStats' },
         { text: 'Job Experience', value: 'jobExp' },
         { text: 'Caste', value: 'caste' },
         { text: 'Category', value: 'category' },
         { text: 'Income', value: 'income' },
         { text: 'Religion', value: 'religion' },
         { text: 'Nationality', value: 'nationality' }
       ],
     studentList: [],
     studentID: null,
     loaded: false,
     exam: {}
  }
},
 methods: {
   remove: function(id){
     var item = this.studentList.find(function (obj) { return obj._id == id});
     axios.AuthAxios.post('/students',{id:id}).then((response) => {
       this.studentList.slice(this.studentList.indexOf(item),this.studentList.indexOf(item)+1)
     })
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
   axios.AuthAxios.get('/students').then((response) => {
     console.log(response.data)
     this.studentList = response.data
     this.loaded = true
   }).catch((err) => {
     this.error = err.toString()
     this.dialog = true
   })
 },
 watch: {

 }
}
</script>

<style lang="css">
  .width-quest {
    width: 100em!important
  }
</style>
