<template lang="html">
    <v-container fluid fill-height grid-list-md text-xs-center v-if="loaded">
      <v-layout wrap>
        <v-layout justify-center row wrap class="ma-0 pa-0">
          <v-flex  xs12>
            <h2>Overall SubjectWise result</h2>
          </v-flex>
          <v-flex xs4 v-for="subject in subjectWise" :key="subject.datasets[0].label">
            <v-card>
              <v-card-title>
                <h2>{{subject.datasets[0].label}}</h2>
              </v-card-title>
              <v-card-text class="px-0">
                <Doughnut :data="subject"></Doughnut>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex  xs12>
            <h2>Overall Set Wise result</h2>
          </v-flex>
            <v-flex xs4 v-for="set in setWise" :key="set.datasets[0].label">
            <v-card>
              <v-card-title>
                <h2>{{set.datasets[0].label}}</h2>
              </v-card-title>
              <v-card-text class="px-0">
                <Doughnut :data="set"></Doughnut>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex  xs12>
            <h2>Income SubjectWise result</h2>
          </v-flex>
          <v-flex xs12 v-for="subject in subjectWiseInc">
            <v-card>
              <v-card-title>
                <h2>{{subject.title}}</h2>
              </v-card-title>
              <v-card-text class="px-0">
                <Bar :data="subject"></Bar>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex  xs12>
            <h2>Category SubjectWise result</h2>
          </v-flex>
          <v-flex xs6 v-for="subject in subjectWiseCat">
            <v-card>
              <v-card-title>
                <h2>{{subject.title}}</h2>
              </v-card-title>
              <v-card-text class="px-0">
                <Bar :data="subject"></Bar>
              </v-card-text>
            </v-card>
          </v-flex>

          <!--   <v-flex xs12>
            <v-card>
              <v-card-title>
                <h2>Overall result</h2>
              </v-card-title>
              <v-card-text class="px-0">
                <Bar :data="overall" :height="150"></Bar>
              </v-card-text>
            </v-card>
          </v-flex>
       <v-flex xs3 v-for="set in setWise" :key="set.datasets[0].label">
            <v-card>
              <v-card-title>
                <h2>{{set.datasets[0].label}}</h2>
              </v-card-title>
              <v-card-text class="px-0">
                <Doughnut :data="set"></Doughnut>
              </v-card-text>
            </v-card>
          </v-flex>-->

        </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
</template>

<script>
import Doughnut from './charts/Doughnut.vue'
import Bar from './charts/Bar.vue'
import axios from '../axios'

export default {
  data() {
    return {
      loaded: false,
      setWise: [],
      subjectWise: [],
      subjectWiseInc: [],
      subjectWiseCat: [],

      colorsCIU: ['#007f00', '#f87979', '#4682b4'],
    }
  },
  components: {
    Doughnut,
    Bar
  },
  methods: {
    setDataSetA(data) {
      this.setWise.push({
        labels: ['Correct', 'Incorrect', 'Unattempted'],
        datasets: [{
          label: 'Set A',
          backgroundColor: ['#007f00', '#f87979', '#4682b4'],
          data: [
            (data.bulk.setvise.setA.correct),
            (data.bulk.setvise.setA.incorrect),
            (data.bulk.setvise.setA.unattempted),
          ]
        }]
      })
    },
    setDataSetB(data) {
      this.setWise.push({
        labels: ['Correct', 'Incorrect', 'Unattempted'],
        datasets: [{
          label: 'Set B',
          backgroundColor: ['#007f00', '#f87979', '#4682b4'],
          data: [
            (data.bulk.setvise.setB.correct),
            (data.bulk.setvise.setB.incorrect),
            (data.bulk.setvise.setB.unattempted),
          ]
        }]
      })
    },
    setDataSetC(data) {
      this.setWise.push({
        labels: ['Correct', 'Incorrect', 'Unattempted'],
        datasets: [{
          label: 'Set C',
          backgroundColor: ['#007f00', '#f87979', '#4682b4'],
          data: [
            (data.bulk.setvise.setC.correct),
            (data.bulk.setvise.setC.incorrect),
            (data.bulk.setvise.setC.unattempted),
          ]
        }]
      })
    },
    setDataSetD(data) {
      this.setWise.push({
        labels: ['Correct', 'Incorrect', 'Unattempted'],
        datasets: [{
          label: 'Set D',
          backgroundColor: ['#007f00', '#f87979', '#4682b4'],
          data: [
            (data.bulk.setvise.setD.correct),
            (data.bulk.setvise.setD.incorrect),
            (data.bulk.setvise.setD.unattempted),
          ]
        }]
      })
    },
    setDataSubjectWiseInc(data) {
      const self = this
      self.subjectWiseInc = []
      let i = 0;
      data.income.forEach((inc) => {

        self.subjectWiseInc.push({
          title: inc.incomeCard,
          labels: [],
          // labels: ['Correct', 'Incorrect', 'Unattempted'],
          datasets: []
        })
        let j = 0
        self.subjectWiseInc[i].datasets.push({
          label: "Correct",
          backgroundColor: '#007f00',
          data: [0,0,0,0]
        })
        self.subjectWiseInc[i].datasets.push({
          label: "Incorrect",
          backgroundColor: '#f87979',
          data: [0,0,0,0]
        })
        self.subjectWiseInc[i].datasets.push({
          label: "Unattempted",
          backgroundColor: '#4682b4',
          data: [0,0,0,0]
        })
        inc.subjectvise.forEach((val) => {
          self.subjectWiseInc[i].labels.push(val.subject)
          self.subjectWiseInc[i].datasets[0].data[j] += val.correct
          self.subjectWiseInc[i].datasets[1].data[j] += val.incorrect
          self.subjectWiseInc[i].datasets[2].data[j] += val.unattempted
          j++;
        })
        i++;
      })
      console.log(JSON.parse(JSON.stringify(this.subjectWiseInc)))
    },
    setDataSubjectWiseCat(data) {
      const self = this
      self.subjectWiseCat = []
      let i = 0;
      data.category.forEach((inc) => {
        self.subjectWiseCat.push({
          title: inc.category,
          labels: [],
          // labels: ['Correct', 'Incorrect', 'Unattempted'],
          datasets: []
        })
        let j = 0
        self.subjectWiseCat[i].datasets.push({
          label: "Correct",
          backgroundColor: '#007f00',
          data: [0,0,0,0]
        })
        self.subjectWiseCat[i].datasets.push({
          label: "Incorrect",
          backgroundColor: '#f87979',
          data: [0,0,0,0]
        })
        self.subjectWiseCat[i].datasets.push({
          label: "Unattempted",
          backgroundColor: '#4682b4',
          data: [0,0,0,0]
        })
        inc.subjectvise.forEach((val) => {
          self.subjectWiseCat[i].labels.push(val.subject)
          self.subjectWiseCat[i].datasets[0].data[j] += val.correct
          self.subjectWiseCat[i].datasets[1].data[j] += val.incorrect
          self.subjectWiseCat[i].datasets[2].data[j] += val.unattempted
          j++;
        })
        i++;
      })
      console.log(JSON.parse(JSON.stringify(this.subjectWiseCat)))
      //    console.log(JSON.stringify(this.subjectWiseCat))
    },
    setDataSubjectWise(data) {
      data.bulk.subjectvise.forEach((val) => {
        this.subjectWise.push({
          labels: ['Correct', 'Incorrect', 'Unattempted'],
          datasets: [{
            label: val.subject,
            backgroundColor: ['#007f00', '#f87979', '#4682b4'],
            data: [
              (val.correct),
              (val.incorrect),
              (val.unattempted),
            ]
          }]
        })
      })
      //    console.log(JSON.stringify(this.subjectWise))
    },
    setOverall(data) {
      this.overall = {
        labels: ['Overall Result'],
        datasets: [{
            label: 'Correct',
            backgroundColor: ['#007f00'],
            data: [
              data.setA.correct + data.setB.correct + data.setC.correct + data.setD.correct,
            ]
          },
          {
            label: 'Incorrect',
            backgroundColor: ['#f87979'],
            data: [
              data.setA.incorrect + data.setB.incorrect + data.setC.incorrect + data.setD.incorrect,
            ]
          },
          {
            label: 'Unattempted',
            backgroundColor: ['#4682b4'],
            data: [
              data.setA.unattempted + data.setB.unattempted + data.setC.unattempted + data.setD.unattempted,
            ]
          },
        ]
      }
    },
    OverallData(data) {
      this.overallData['total']
    }
  },
  created() {

    axios.AuthAxios.get('/getBulkAnalytics').then((val) => {
      const data = val.data
      this.setDataSetA(data)
      this.setDataSetB(data)
      this.setDataSetC(data)
      this.setDataSetD(data)
      this.setDataSubjectWise(data)
      this.setDataSubjectWiseInc(data)
      this.setDataSubjectWiseCat(data)
      //    this.setOverall(data)
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
</style>
