<template lang="pug">
    .studies
        template(v-if="!selectedStudy")
            .text-h4.my-4 Studies

            .d-flex.flex-column(v-if="!!$store.state.studies.length")
                v-btn(
                    v-for="study in $store.state.studies"
                    v-text="study.name"
                    :key="study.id"
                    @click="show(study)")
            v-subheader.red--text(v-else) No studies, click the button below to create a new one.

            v-btn.mt-4(
                dark
                color="green"
                @click="createNew()") Create new

            .questionnaires.mt-12
                questionnaires

            v-dialog(
                v-if="!!editedStudy"
                :value="true"
                persistent
                max-width="640px")
                study-editor(
                    :study="editedStudy"
                    @save="save"
                    @cancel="cancel")

        study-viewer(
            v-else
            :study="selectedStudy"
            @closed="hide()")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import { mapActions } from 'vuex';

import Questionnaires from '@/components/Questionnaires.vue';
import StudyEditor from '@/components/StudyEditor.vue';
import StudyViewer from '@/components/StudyViewer.vue';

import Study from '@/models/study';

@Component({
    components: {
        Questionnaires,
        'study-editor': StudyEditor,
        'study-viewer': StudyViewer,
    },
    // methods: {
    //    ...mapActions(['addTodo'])
    // },
})
export default class Studies extends Vue {

    editedStudy: Study | null = null;
    selectedStudy: Study | null = null;

    createNew() {
        this.editedStudy = new Study();
    }

    save( study: Study ) {
        this.editedStudy = null;
        this.$store.commit( 'addStudy', study );
        this.$store.dispatch( 'save' );
    }

    cancel() {
        this.editedStudy = null;
    }

    show( study: Study ) {
        this.selectedStudy = study;
    }

    hide() {
        this.selectedStudy = null;
    }
}
</script>
