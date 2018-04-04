<template lang="html">
  <v-container grid-list-md text-xs-center>
    <v-layout wrap>
      <v-flex row md8>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Title"
      v-model="title"
      :rules="[v => !!v || 'Title is required']"
      required
    ></v-text-field>
    <v-text-field
      label="Duration"
      v-model="duration"
      required
    ></v-text-field>
    <v-text-field
               name="instructions"
               label="Instructions"
               v-model="inst"

               textarea
             ></v-text-field>
    <h3 class="mt-3">Languages:</h3>
    <v-text-field
          name="langInput"
          label="Language"
          v-model="lang"
          append-icon="add"
          :append-icon-cb="() => langList.push({key: currentLangId++,title:lang})"
        ></v-text-field>
        <v-list subheader>
          <v-subheader>Languages</v-subheader>
          <v-list-tile avatar v-for="item in langList" :key="item.key" @click="">
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn flat @click="deleteBtn(item.key)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <h3 class="mt-3">Batches:</h3>
        <v-text-field
              name="batchinput"
              label="Start Time (dd/mm/yyyy hh:mm)"
              mask="##/##/#### ##:##"
              v-model="startTime"
              append-icon="add"
              :append-icon-cb="() => batchList.push({key: currentBatchId++,start:startTime})"
            ></v-text-field>
        <v-list subheader>
          <v-subheader>Batches</v-subheader>
          <v-list-tile avatar v-for="item in batchList" :key="item.key" @click="">
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn flat @click="deleteBtn(item.key)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <h3 class="mt-3">Batches:</h3>
        <v-layout row>
        <v-text-field xs12
        label="Subject"
        v-model="subject"
        ></v-text-field>
        </v-layout>
        <v-layout row>
         <v-flex xs5>
           <v-subheader>Number of questions in SET A : </v-subheader>
         </v-flex>
         <v-flex xs7>
           <v-text-field
             label="Enter Here"
            v-model="NoQA"
           ></v-text-field>
         </v-flex>
        </v-layout>
        <v-layout row>
         <v-flex xs5>
           <v-subheader>Number of questions in SET B : </v-subheader>
         </v-flex>
         <v-flex xs7>
           <v-text-field
             label="Enter Here"
             v-model="NoQB"
           ></v-text-field>
         </v-flex>
        </v-layout>
        <v-layout row>
         <v-flex xs5>
           <v-subheader>Number of questions in SET C : </v-subheader>
         </v-flex>
         <v-flex xs7>
           <v-text-field
             label="Enter Here"
             v-model="NoQC"
           ></v-text-field>
         </v-flex>
        </v-layout>
        <v-layout row>
         <v-flex xs5>
           <v-subheader>Number of questions in SET D : </v-subheader>
         </v-flex>
         <v-flex xs7>
           <v-text-field
             label="Enter Here"
             v-model="NoQD"
           ></v-text-field>
         </v-flex>
        </v-layout>
        <v-layout row>
          <v-btn color="primary" @click="addSub()">
            Add
          </v-btn>
        </v-layout>
        <v-list subheader>
          <v-subheader>Subjects</v-subheader>
          <v-list-tile avatar v-for="item in subjectsList" :key="item.key" @click="">
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn flat @click="deleteBtn(item.key)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

      <v-btn @click="submit()">
        Submit
      </v-btn>
  </v-form>
</v-flex>
</v-layout>
</v-container>
</template>

<script>
import axios from '../axios'

export default {
  data() {
    return {
      valid: true,
      lang: null,
      title:'',
      duration: '',
      inst:'',
      currentLangId: 0,
      langList: [

      ],
      startTime: null,
      currentBatchId: 0,
      batchList: [

      ],
      subject: '',
      NoQA: 0,
      NoQB: 0,
      NoQC: 0,
      NoQD: 0,
      subjectIndex:0,
      subjectsList: [

      ],
    }
  },
  methods: {
    deleteBtn(key) {
      console.log(obj)
      // this.langList.splice(x,1);
    },
    addSub(){
      this.subjectsList.push({
        key : this.subjectIndex,
        title : this.subject,
        NoQA : this.NoQA,
        NoQB : this.NoQB,
        NoQC : this.NoQC,
        NoQD : this.NoQD,
      })
    },
    submit() {
      axios.AuthAxios.post('/addExam', {
        languages : this.langList,
        title : this.title,
        duration : this.duration,
        batches : this.batchList,
        instructions: this.inst,
        subjects : this.subjectsList
      }).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>

<style lang="css">
</style>
