

<v-data-table
  :headers="headers"
  :items="studentList"
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
      <td class="text-xs-right">{{ props.item.firstName}}</td>
      <td class="text-xs-right">{{ props.item.middleName}}</td>
      <td class="text-xs-right">{{ props.item.lastName}}</td>

      <td class="text-xs-right">{{ props.item.gender}}</td>
      <td class="text-xs-right">{{ props.item.batch }}</td>
      <td class="text-xs-right">{{ props.item.aadharNo }}</td>
      <td class="text-xs-right">{{ props.item.password }}</td>

      <td class="text-xs-right">{{ props.item.contactNo }}</td>
      <td class="text-xs-right">{{ props.item.email }}</td>
      <td class="text-xs-right">{{ props.item.eduQuali}}</td>
      <td class="text-xs-right">{{ props.item.marStats}}</td>
      <td class="text-xs-right">{{ props.item.jobExp}}</td>
      <td class="text-xs-right">{{ props.item.caste}}</td>
      <td class="text-xs-right">{{ props.item.category}}</td>
      <td class="text-xs-right">{{ props.item.income}}</td>
      <td class="text-xs-right">{{ props.item.religion}}</td>
      <td class="text-xs-right">{{ props.item.nationality}}</td>

    </template>
  </v-data-table>
  <div class="text-xs-center pt-2">
    <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
  </div>


  Enter the ID of the student to be removed:
  <v-text-field
    label="studentID"
    v-model="studentID"
    :rules="[v => !!v || 'Please enter a student ID.']"
    required
  ></v-text-field>
  <v-btn @click="remove(studentID)">Delete</v-btn>

</v-app>

</template>

<script>
import axios from '../axios'

export default {

 data() {
   return {
     search: '',
     pagination: {},

     headers: [
         {
           text: 'ID',
           align: 'left',
           value: '_id',
         },
         { text: 'First Name', value: 'firstName' },
         { text: 'Middle Name', value: 'middleName' },
         { text: 'Last Name', value: 'lastName' },
         { text: 'Gender', value: 'gender' },
         { text: 'Password', value: 'password' },
         { text: 'Batch', value: 'batch' },
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

   remove: function(stu){
     console.log(stu);
     var idx = this.studentList.indexOf(stu)
     console.log('idx', idx)
     this.studentList.splice(idx,1)
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
     this.studentList = response.data.question_papers[0].A
     this.loaded = true
   }).catch((err) => {
     this.error = err.toString()
     this.dialog = true
     console.log(this.err)
   })
 }
}
</script>

<style lang="css">
  .width-quest {
    width: 100em!important
  }
</style>
