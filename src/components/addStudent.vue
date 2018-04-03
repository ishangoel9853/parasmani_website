<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="First Name"
      v-model="firstName"
      :rules="nameRules"
      required
    ></v-text-field>
    <v-text-field
      label="Middle Name"
      v-model="middleName"
      :rules="nameRules"
      required
    ></v-text-field>
    <v-text-field
      label="Last Name"
      v-model="lastName"
      :rules="nameRules"
      required
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
      <v-radio label="Single" value="0" ></v-radio>
      <v-radio label="Married" value="1"></v-radio>
    </v-radio-group>

    Job Experience:
  <v-radio-group v-model="jobExp" row>
    <v-radio label="Yes" value="1" ></v-radio>
    <v-radio label="no" value="0"></v-radio>
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
      <v-radio label="BPL" value="0" ></v-radio>
      <v-radio label="APL" value="1"></v-radio>
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
</template>

<script>
  import AuthAxios from '../axios'

  export default {
    data: () => ({
      valid: true,
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      genderList: [
        'Male',
        'Female',
        'Other'
      ],
      nameRules: [
        v => !!v || 'Name is required',
      ],
      batch: null,
      batchList: [
        '',
        '',
        ''
      ],
      aadharNo: '',
      aadharRules: [
        v => !!v || 'Aadhar number is required',
        V => (/^[0-9]+$/ && v.length ==12) || 'Invalid Aadhar number. Please enter a valid aadhar number'
      ],
      contactNo: '',
      contactRules: [

        V => (/^[0-9]*$/ && v.length ==10) || 'Invalid contact number. Please enter a valid contact number'
      ],
      email: '',
      emailRules: [
        v => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || /^/) || 'E-mail must be valid'
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
      incomeRules:[
        v => !!v || 'Annual income is required',
        V => /^[0-9]+$/ || 'Invalid income. Please enter the annual income in rupees.'
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
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          AuthAxios.post('/register', {
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
            nationality: this.nationality
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

<style lang="css">
</style>
