<template lang="html">
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
        Batches:
      <v-text-field
              name="batchinput"
              label="Start Time (dd/mm/yyyy hh:mm)"

              mask="##/##/#### ##:##"

              v-model="startTime"
              append-icon="add"
              :append-icon-cb="() => batchList.push({key: currentBatchId++,title:startTime})"
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

  </v-form>
</template>

<script>
export default {
  data () {
      return {
        valid: true,
        lang: null,
        currentLangId: 0,
        langList: [

            ],
        startTime: null,
        currentBatchId: 0,
        batchList: [

        ]
      }
    },
    methods: {
      deleteBtn(key) {
        console.log(obj)
        // this.langList.splice(x,1);
      }
    }
}
</script>

<style lang="css">
</style>
