<template lang="html">
  <div>
    <v-btn large @click="genResults">Generate Results</v-btn>
    <v-btn large @click="genStudentAnal" >Generate Student Analytics</v-btn>
    <v-btn large @click="genBulkAnal" >Generate Bulk Analytics</v-btn>
    <v-btn large @click="genIncomeAnal" >Generate Income Analytics</v-btn>
    <v-btn large @click="genCategoryAnal" >Generate Category Analytics</v-btn>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <h2>{{errorTitle}}</h2>
          </v-card-title>
          <v-card-text>
            {{error}}
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="dialog=false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
import axios from '../axios'

export default {
  data: () => ({
    dialog: false,
    error: '',
    errorTitle: '',
  }),
  methods: {
    throwUp: function(title,content) {
      this.error = content
      this.errorTitle = title
      this.dialog = true
    },
    genResults: function () {
      axios.get("generateResults").then((val) => {
        this.throwUp("Successful!!","Generated Successfully")
      }).catch((val) => {
        this.throwUp("Error!!","val")
      })
    },
genStudentAnal: function () {
  axios.get("generateStudentAnalytics").then((val) => {
    this.throwUp("Successful!!","Generated Successfully")
    }).catch((val) => {
    this.throwUp("Error!!","val")
    })
},
genBulkAnal: function () {
  axios.get("generateBulkAnalytics").then((val) => {
    this.throwUp("Successful!!","Generated Successfully")
    }).catch((val) => {
    this.throwUp("Error!!","val")
    })
},
genIncomeAnal: function () {
  axios.get("generateIncomeAnalytics").then((val) => {
    this.throwUp("Successful!!","Generated Successfully")
    }).catch((val) => {
    this.throwUp("Error!!","val")
    })
},
genCategoryAnal: function () {
  axios.get("generateCategoryAnalytics").then((val) => {
    this.throwUp("Successful!!","Generated Successfully")
    }).catch((val) => {
    this.throwUp("Error!!","val")
    })
},
  }
}
</script>

<style lang="css">
</style>
