<template>
  <v-container grid-list-md text-xs-center>
    <v-layout wrap>
      <v-flex row md12>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-select
      label="Language ID"
      v-model="langID"
      :items="langList"
      :rules="[v => !!v || 'Language is required']"
      required
    ></v-select>
    <v-layout row wrap>
      <v-flex xs6>
        <v-text-field
          label="Question"
          v-model="question"
            multi-line

          :rules="[v => !!v || 'Please enter a question.']"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <p v-html="markedQuestion">
        </p>
      </v-flex>
    </v-layout>
    <v-text-field
      label="Option1"
      v-model="opt1"
      :rules="[v => !!v || 'Please enter option1.']"
      required
    ></v-text-field>
    <v-text-field
      label="Option2"
      v-model="opt2"
      :rules="[v => !!v || 'Please enter option2.']"
      required
    ></v-text-field>
    <v-text-field
      label="Option3"
      v-model="opt3"
      :rules="[v => !!v || 'Please enter option3.']"
      required
    ></v-text-field>
    <v-text-field
      label="Option4"
      v-model="opt4"
      :rules="[v => !!v || 'Please enter option4.']"
      required
    ></v-text-field>
    <v-select
      label="correct"
      v-model="correct"
      :items="correctList"
      :rules="[v => !!v || 'Correct Answer is required']"
      required
    ></v-select>

    <v-select
      label="Subject"
      v-model="subject"
      :items="subjectList"
      :rules="[v => !!v || 'Subject is required']"
      required
    ></v-select>

    <v-select
      label="Difficulty"
      v-model="difficulty"
      :items="difficultyList"
      :rules="[v => !!v || 'Difficulty is required']"
      required
    ></v-select>



    <v-checkbox
      label="Do you agree?"
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      required
    ></v-checkbox>

    <!-- :disabled="!valid" -->
    <v-btn
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</v-flex>
</v-layout>
</v-container>
</template>

<script>
  import axios from '../axios'
  import marked from 'marked'
  export default {
    data: () => ({
      loaded: false,
      valid: true,
      langID: 0,
      langList: [],
      question: '',
      opt1: '',
      opt2: '',
      opt3: '',
      opt4: '',
      subject: null,
      subjectList: [],
      correctList: [
        1,2,3,4
      ],
      correct: null,
      difficulty: '',
      difficultyList: [
        'A',
        'B',
        'C',
        'D'
      ],
      checkbox: false
    }),
    methods: {
      submit () {

        axios.AuthAxios.post('/addQuestion', {
          language: this.langID,
          question: this.question,
          opt1: this.opt1,
          opt2: this.opt2,
          opt3: this.opt3,
          opt4: this.opt4,
          correct: this.correct,
          subject: this.subject,
          difficulty: this.difficulty
        }).then((response) => {
          console.log(response)
        }).catch((err) => {
          this.error = err.toString()
          this.dialog = true
          console.log(this.err)
        })
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    },
    computed: {
      markedQuestion: function() {
        return marked(this.question)
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
