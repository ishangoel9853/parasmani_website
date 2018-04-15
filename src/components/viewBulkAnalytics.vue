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
          <v-flex xs4 v-for="subject in subjectWiseInc" :key="subject.datasets[0].label">
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
            <h2>Caategory SubjectWise result</h2>
          </v-flex>
          <v-flex xs4 v-for="subject in subjectWiseCat" :key="subject.datasets[0].label">
            <v-card>
              <v-card-title>
                <h2>{{subject.datasets[0].label}}</h2>
              </v-card-title>
              <v-card-text class="px-0">
                <Doughnut :data="subject"></Doughnut>
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
  data () {
    return {
      loaded: false,
      setWise: [],
      subjectWise: [],
      subjectWiseInc: [],
      subjectWiseCat: [],

      colorsCIU: ['#007f00','#f87979','#4682b4'],
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
        datasets: [
          {
            label: 'Set A',
            backgroundColor: ['#007f00','#f87979','#4682b4'],
            data: [
              (data.bulk.setvise.setA.correct),
              (data.bulk.setvise.setA.incorrect),
              (data.bulk.setvise.setA.unattempted),
            ]
          }
        ]
      })
    },
    setDataSetB(data) {
      this.setWise.push({
        labels: ['Correct', 'Incorrect', 'Unattempted'],
        datasets: [
          {
            label: 'Set B',
            backgroundColor: ['#007f00','#f87979','#4682b4'],
            data: [
              (data.bulk.setvise.setB.correct),
              (data.bulk.setvise.setB.incorrect),
              (data.bulk.setvise.setB.unattempted),
            ]
          }
        ]
      })
    },
    setDataSetC(data) {
      this.setWise.push({
        labels: ['Correct', 'Incorrect', 'Unattempted'],
        datasets: [
          {
            label: 'Set C',
            backgroundColor: ['#007f00','#f87979','#4682b4'],
            data: [
              (data.bulk.setvise.setC.correct),
              (data.bulk.setvise.setC.incorrect),
              (data.bulk.setvise.setC.unattempted),
            ]
          }
        ]
      })
    },
    setDataSetD(data) {
      this.setWise.push({
        labels: ['Correct', 'Incorrect', 'Unattempted'],
        datasets: [
          {
            label: 'Set D',
            backgroundColor: ['#007f00','#f87979','#4682b4'],
            data: [
              (data.bulk.setvise.setD.correct),
              (data.bulk.setvise.setD.incorrect),
              (data.bulk.setvise.setD.unattempted),
            ]
          }
        ]
      })
    },
    setDataSubjectWiseInc(data) {
      data.income.subjectvise.forEach((val) => {
        this.subjectWiseInc.push({
          labels: ['Correct', 'Incorrect', 'Unattempted'],
          datasets: [
            {
              label: val.subject,
              backgroundColor: ['#007f00','#f87979','#4682b4'],
              data: [
                (val.correct),
                (val.incorrect),
                (val.unattempted),
              ]
            }
          ]
        })
      })
      console.log(JSON.stringify(this.subjectWiseInc))
    },
    setDataSubjectWiseCat(data) {
      data.category.subjectvise.forEach((val) => {
        this.subjectWiseCat.push({
          labels: ['Correct', 'Incorrect', 'Unattempted'],
          datasets: [
            {
              label: val.subject,
              backgroundColor: ['#007f00','#f87979','#4682b4'],
              data: [
                (val.correct),
                (val.incorrect),
                (val.unattempted),
              ]
            }
          ]
        })
      })
  //    console.log(JSON.stringify(this.subjectWiseCat))
    },
    setDataSubjectWise(data) {
      data.bulk.subjectvise.forEach((val) => {
        this.subjectWise.push({
          labels: ['Correct', 'Incorrect', 'Unattempted'],
          datasets: [
            {
              label: val.subject,
              backgroundColor: ['#007f00','#f87979','#4682b4'],
              data: [
                (val.correct),
                (val.incorrect),
                (val.unattempted),
              ]
            }
          ]
        })
      })
  //    console.log(JSON.stringify(this.subjectWise))
    },
    setOverall(data) {
      this.overall = {
        labels: ['Overall Result'],
        datasets: [
          {
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
  created () {

    axios.AuthAxios.get('/getBulkAnalytics').then((val) => {
      console.log(val.data)
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
