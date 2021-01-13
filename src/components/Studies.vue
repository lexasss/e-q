<template lang="pug">
    .studies
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

        v-dialog(
            v-if="!!editedStudy"
            :value="true"
            persistent
            max-width="640px")
            study-editor.pa-4(
                :study="editedStudy"
                @save="save"
                @cancel="cancel")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import { mapActions } from 'vuex';

import StudyEditor from '@/components/StudyEditor.vue';

import Study from '@/models/study';

@Component({
    components: {
        'study-editor': StudyEditor,
    },
    // methods: {
    //    ...mapActions(['addTodo'])
    // },
})
export default class Studies extends Vue {

    editedStudy: Study | null = null;

    public clone( study: Study ) {
        this.editedStudy = Study.from( study, true );
    }

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
        this.$emit( 'study', study );
    }
}
</script>
