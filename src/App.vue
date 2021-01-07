<template lang="pug">
  #app
    section.hero.is-primary(v-show="!isRunningStudy")
        .hero-body
            .container.header
                h1.title E-Q
                h2.subtitle.is-5 offline questionnaire
    section.section
        .container
            studies
</template>

<script lang="ts">

/*

requirements:
+ a list of studies
+ each study has a list of questionnaires to complete (may contain repetitions)
- add / edit / delete / rename / clone a qustionnaire
+ several question types (scale #20, scale -3..3, scale 0..5, checkbox, options, number, text, )
- add / edit / delete / rename / clone a study
+ export study data to a file
+ data is stores in localStorage, but online storage may be added later
    + Storage interface

pages:
+ main: list of studies, list of common questionnaires
- a study:
    + name,
    - description,
    + list of questionnaires to complete,
        - buttons to order / edit / delete
        - a button to add a quesionnaire,
    + a button to add a participant,
    + a button to export data
- a questionnaire:
    + name, id, common/study-only flag,
    - questions
        + title,
        - description,
        + id
        + type:
            + number (from a range)
            + text short / long
            + scales/sliders with up to 3 labels
            + a set of checkboxes
            + a set of radio buttons / dropdown menu
 */

import { Component, Vue } from 'vue-property-decorator';
import Studies from '@/components/Studies.vue';

@Component({
  components: {
    Studies,
  },
})
export default class App extends Vue {
    get isRunningStudy() {
        return this.$store.state.isRunningStudy;
    }

    created() {
        this.$store.dispatch('connect', 'local');
    }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
