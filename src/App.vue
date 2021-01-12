<template lang="pug">
    v-app#app
        v-app-bar(app color="primary" dark v-show="!isRunningStudy")
            div.d-flex.align-center
                v-img.shrink.mr-3(alt="E-Q Logo" contain src="@/assets/logo.png" transition="scale-transition" width="40")
                v-toolbar-title E-Q

            v-spacer

            v-subheader offline questionnaire

        v-main
            v-container(fluid)
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
