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
      :rules="durationRules"
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
              <v-list-tile-title v-html="item.title">
              </v-list-tile-title>
            </v-list-tile-content>
            <v-btn @click="removeLang(item.title)">Delete</v-btn>

          </v-list-tile>
        </v-list>
        <h3 class="mt-3">Batches:</h3>
        <v-layout wrap>
          <v-flex row md6>
              <v-date-picker v-model="dateData"></v-date-picker>
          </v-flex>
          <v-flex row md6>
              <v-time-picker v-model="timeData"></v-time-picker>
          </v-flex>
          <v-btn row md12 color="primary" @click="addDateTime()">
            Add
          </v-btn>
        </v-layout>
        <v-list subheader>
          <v-subheader>Batches</v-subheader>
          <v-list-tile avatar v-for="item in batchList" :key="item.key" @click="">
            <v-list-tile-content>
              <v-list-tile-title v-html="item.start"></v-list-tile-title>
            </v-list-tile-content>
            <v-btn @click="removeBatch(item.start)">Delete</v-btn>

          </v-list-tile>
        </v-list>
        <h3 class="mt-3">Subject:</h3>
        <v-layout row>
        <v-text-field xs12
        label="Subject"
        v-model="subject"
        ></v-text-field>
        </v-layout>
        <v-layout row>
         <v-flex xs5>
           <v-subheader>Number of questions in SET A (1 mrk) : </v-subheader>
         </v-flex>
         <v-flex xs7>
           <v-text-field
             label="Enter Here"
             v-model="NoQA"
             :rules="optRules"

           ></v-text-field>
         </v-flex>
        </v-layout>
        <v-layout row>
         <v-flex xs5>
           <v-subheader>Number of questions in SET B (2 mrks): </v-subheader>
         </v-flex>
         <v-flex xs7>
           <v-text-field
             label="Enter Here"
             v-model="NoQB"
             :rules="optRules"

           ></v-text-field>
         </v-flex>
        </v-layout>
        <v-layout row>
         <v-flex xs5>
           <v-subheader>Number of questions in SET C (3 mrks): </v-subheader>
         </v-flex>
         <v-flex xs7>
           <v-text-field
             label="Enter Here"
             v-model="NoQC"
             :rules="optRules"

           ></v-text-field>
         </v-flex>
        </v-layout>
        <v-layout row>
         <v-flex xs5>
           <v-subheader>Number of questions in SET D (+4,-1 mrks): </v-subheader>
         </v-flex>
         <v-flex xs7>
           <v-text-field
             label="Enter Here"
             v-model="NoQD"
             :rules="optRules"

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
              <v-list-tile-title v-html="returnSubject(item)"></v-list-tile-title>
            </v-list-tile-content>
            <v-btn @click="removeSubject(item.title)">Delete</v-btn>

          </v-list-tile>
        </v-list>

      <v-btn @click="submit()">
        Submit
      </v-btn>
        <v-btn @click="clear">clear</v-btn>
  </v-form>
</v-flex>
</v-layout>
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
</v-container>
</template>

<script>
import axios from '../axios'


export default {
  data() {
    return {
      valid: true,
      lang: null,
      dateData: null,
      timeData: null,
      title:'',
      duration: 0,
      error: '',
      errorTitle: '',
      dialog: false,
      durationRules: [
        v => !!v || 'Duration is required',
        v => (/^[0-9]+$/.test(v)) || 'Invalid Duration. Please enter a valid Duration '
      ],
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
      optRules: [
        v => !!v || 'Number of questions is required',
        v => (/^[0-9]+$/.test(v)) || 'Invalid Number. Please enter a valid number '

      ],
      subjectIndex:0,
      subjectsList: [

      ],
    }
  },
  methods: {
    removeLang: function(lang){
      console.log(lang);
      for(var i=0; i < this.langList.length; i++) {
         if(this.langList[i].title == lang)
         {
            this.langList.splice(i,1);
         }
      }
    },
    removeBatch: function(start){
      console.log(start);
      for(var i=0; i < this.batchList.length; i++) {
         if(this.batchList[i].start == start)
         {
            this.batchList.splice(i,1);
         }
      }
    },
    removeSubject: function(title){
      console.log(title);
      for(var i=0; i < this.subjectsList.length; i++) {
         if(this.subjectsList[i].title == title)
         {
            this.subjectsList.splice(i,1);
         }
      }
    },
    returnSubject: function(item) {
      return ("<b>").concat(item.title).concat("</b>&nbsp&nbsp&nbsp")
      .concat("Set A : ").concat(item.NoQA).concat("&nbsp|&nbsp")
      .concat("Set B : ").concat(item.NoQB).concat("&nbsp|&nbsp")
      .concat("Set C : ").concat(item.NoQC).concat("&nbsp|&nbsp")
      .concat("Set D : ").concat(item.NoQD).concat("&nbsp|&nbsp")
    },
    throwUp: function(title,content) {
      this.error = content
      this.errorTitle = title
      this.dialog = true
    },
    strToTime (time) {
    let dd = time.slice(0,2)
    let mm = time.slice(2,4)
    let yyyy = time.slice(4,8)
    let hr = time.slice(8,10)
    let min = time.slice(10,12)
    let date = new Date(`${yyyy}-${mm}-${dd}T${hr}:${mm}:00`);
    return Date.parse(date).toString();
  },
    addDateTime() {
      let val = this.dateData.toString().concat("T").concat(this.timeData.toString()) ;
      let dat = new Date(val)
      this.batchList.push({key: this.currentBatchId++,start:dat.toUTCString()})
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
        title : this.subject,
        duration : this.duration,
        batches : this.batchList,
        instructions: this.inst,
        subjects : this.subjectsList
      }).then((response) => {
        console.log(response)
          this.throwUp("Successful!!","Created Successfully")
      }).catch((err) => {
        this.throwUp("Error!!",err.toString())
      })
    },
    clear () {
      this.$refs.form.reset();
      this.langList={};
      this.subjectsList={};
      this.batchList={};
    }
  }
}
</script>

<style lang="css">
</style>
