<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-select
      label="Language ID"
      v-model="langID"
      :items="langList"
      :rules="[v => !!v || 'Language is required']"
      required
    ></v-select>
    <v-text-field
      label="Question"
      v-model="question"
      :rules="[v => !!v || 'Please enter a question.']"
      required
    ></v-text-field>
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

    <v-btn
      @click="submit"
      :disabled="!valid"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>






<script>
  import axios from 'axios'

  export default {
    data: () => ({
      valid: true,
      langID: '',
      langList: [
        ],
      question: '',
      opt1: '',
      opt2: '',
      opt3: '',
      opt4: '',
      subject: null,
      subjectList: [

      ],

      difficulty: '',
      difficultyList: [
        '1',
        '2',
        '3',
        '4'
      ],


      checkbox: false
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          AuthAxios.post('/register', {
            paperID: this.paperID,
            question: this.question,
            opt1: this.opt1,
            opt2: this.opt2,
            opt3: this.opt3,
            opt4: this.opt4,
            subject: this.subject,
            difficulty: this.difficulty,

          }).then((response) => {
            console.log(response)
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>
