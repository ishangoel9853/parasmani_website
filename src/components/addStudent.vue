<template>
  <v-container grid-list-md text-xs-center>
    <v-layout wrap>
      <v-flex row md8>
  <v-form v-model="valid" fluid   ref="form" lazy-validation>
    <v-text-field
      label="First Name"
      v-model="firstName"
      :rules="nameRules"
      required
    ></v-text-field>
    <v-text-field
      label="Middle Name"
      v-model="middleName"
    ></v-text-field>
    <v-text-field
      label="Last Name"
      v-model="lastName"
    ></v-text-field>
    <v-select
      label="Gender"
      v-model="gender"
      :items="genderList"
      :rules="[v => !!v || 'Gender is required']"
      required
    ></v-select>
    <v-select
      label="Examination Batch"
      v-model="batch"
      :items="batchList"
      :rules="[v => !!v || 'Batch is required']"
      required
    ></v-select>
    <v-text-field
      label="Aadhar Number"
      v-model="aadharNo"
      :rules="aadharRules"
      :counter="12"
      required
    ></v-text-field>
    <v-text-field
      label="Password"
      v-model="password"
      type="password"
      :counter="12"
      required
    ></v-text-field>
    <v-text-field
      label="Contact Number"
      v-model="contactNo"
      :rules="contactRules"
      :counter="10"
    ></v-text-field>
    <v-text-field
      label="E-mail"
      v-model="email"
      :rules="emailRules"
    ></v-text-field>
    <v-text-field
      label="Educational Qualification"
      v-model="eduQuali"
    ></v-text-field>
      Marital Status:
    <v-radio-group v-model="marStats" row>
      <v-radio label="Single" value="Single" ></v-radio>
      <v-radio label="Married" value="Married"></v-radio>
    </v-radio-group>

    Job Experience:
  <v-radio-group v-model="jobExp" row>
    <v-radio label="Yes" value="Yes" ></v-radio>
    <v-radio label="No" value="No"></v-radio>
  </v-radio-group>
    <v-select
      label="Caste"
      v-model="caste"
      :items="casteList"
      :rules="[v => !!v || 'Caste is required']"
      required
    ></v-select>
    <v-select
      label="Category"
      v-model="category"
      :items="categoryList"
      :rules="[v => !!v || 'Category is required']"
      required
    ></v-select>
    <v-text-field
      label="Annual Income of the family"
      v-model="income"
      :rules="incomeRules"
      required
    ></v-text-field>
    Income card holder :
    <v-radio-group v-model="incomeCard" row>
      <v-radio label="BPL" value="BPL" ></v-radio>
      <v-radio label="APL" value="APL"></v-radio>
    </v-radio-group>
    <v-select
      label="Religion"
      v-model="religion"
      :items="religionList"
      :rules="[v => !!v || 'Religion is required']"
      required
    ></v-select>
    <v-text-field
      label="Nationality"
      v-model="nationality"
      :rules="nationalityRules"
      required
    ></v-text-field>
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
    data: () => ({
      valid: true,
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      password:'',
      genderList: [
        'Male',
        'Female',
        'Other'
      ],
      nameRules: [
        v => !!v || 'Name is required',
      ],
      batch: null,
      batchList: [],
      aadharNo: '',
      aadharRules: [
        v => !!v || 'Aadhar number is required',
        v => (/^[0-9]+$/.test(v) && v.length ==12) || 'Invalid Aadhar number. Please enter a valid aadhar number'
      ],
      contactNo: '',
      contactRules: [
        v => (/^[0-9]*$/.test(v) && v.length ==10) || 'Invalid contact number. Please enter a valid contact number'
      ],
      email: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/.test(v)  || 'E-mail must be valid'

        //v => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || /^/) || 'E-mail must be valid'
      ],
      eduQuali: '',
      marStats: '0',
      jobExp: '0',
      caste: null,
      casteList: [
        'Brahmin',
        'Kshatriya',
        'Vaisya',
        'Sudra',
        'Harijan',
        'Other'
      ],
      category: '',
      categoryList: [
        'General',
        'SC',
        'ST',
        'OBC',
        'Other'
      ],
      income: '',
      incomeRules: [
        v => !!v || 'Income is required',
        v => (/^[0-9]+$/.test(v)) || 'Invalid Aadhar number. Please enter a valid aadhar number'
      ],
      incomeCard: '0',
      religion: null,
      religionList: [
        'Hindu',
        'Muslim',
        'Christian',
        'Sikh',
        'Jain',
        'Buddhist',
        'Other'
      ],
      nationality: '',
      nationalityRules:[
        v => !!v || 'Nationality is required'
      ],
      checkbox: false
    }),

    methods: {
      throwUp: function(title,content) {
        this.error = content
        this.errorTitle = title
        this.dialog = true
      },
      submit () {
        if (this.$refs.form.validate()) {
          axios.AuthAxios.post('/signup/student', {
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
            gender: this.gender,
            batch: this.batch,
            aadharNo: this.aadharNo,
            contactNo: this.contactNo,
            email: this.email,
            eduQuali: this.eduQuali,
            marStats: this.marStats,
            jobExp: this.jobExp,
            caste: this.caste,
            category: this.category,
            income: this.income,
            incomeCard:this.incomeCard,
            religion: this.religion,
            nationality: this.nationality,
            password: this.password
          }).then((response) => {
            console.log(response)
            this.throwUp("Successful!!","Created Successfully")
          }).catch((err) => {
            this.throwUp("Successful!!",err.toString())
          })
          // Native form submission is not yet supported
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    },
    mounted: function() {
      const self = this
      axios.AuthAxios.get('/batches').then((response) => {
        response.data.forEach(function(val) {
          self.batchList.push(JSON.stringify(val))
        })
      })
    }
  }
</script>

<style lang="css">
</style>
