<template lang="pug">
    v-app#app
        v-app-bar(
            app
            color="primary"
            dark
            v-show="!isRunningStudy")

            div.d-flex.align-center
                v-img.shrink.mr-3(
                    alt="E-Q Logo"
                    contain
                    src="@/assets/logo.png"
                    transition="scale-transition"
                    width="40")
                v-toolbar-title E-Q

            v-spacer

            v-subheader offline questionnaire

        v-main(:class="{ 'pa-0': isRunningStudy }")
            v-container(fluid)
                template(v-if="!selectedStudy")
                    studies(
                        ref="studies"
                        @study="selectStudy")
                    v-divider.mt-12
                    questionnaires
                study-viewer(
                    v-else
                    :study="selectedStudy"
                    @clone="cloneStudy"
                    @closed="hideStudyViewer()")
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
    + description,
    + list of questionnaires to complete,
        - buttons to order / edit / delete
        + a button to add a quesionnaire,
    + a button to add a participant,
    + a button to export data
- a questionnaire:
    + name, id, common/study-only flag,
    + questions
        + title,
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
import Questionnaires from '@/components/Questionnaires.vue';
import StudyViewer from '@/components/StudyViewer.vue';

import Study from '@/models/study';

@Component({
    components: {
        Studies,
        Questionnaires,
        'study-viewer': StudyViewer,
    },
})
export default class App extends Vue {

    selectedStudy: Study | null = null;

    get isRunningStudy() {
        return this.$store.state.isRunningStudy;
    }

    selectStudy( study: Study ) {
        this.selectedStudy = study;
    }

    cloneStudy( study: Study ) {
        this.selectedStudy = null;
        this.$nextTick().then(() => {
            (this.$refs.studies as Studies).clone( study );
        });
    }

    hideStudyViewer() {
        this.selectedStudy = null;
    }

    created() {
        this.$store.dispatch( 'connect', 'local' );
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