<template lang="pug">
    .studies
        .text-h4.my-4 Studies

        v-list(
            v-if="$store.state.studies.length"
            dense)
            v-list-item(
                v-for="study in $store.state.studies"
                :key="study.id")
                v-list-item-content.py-0
                    v-btn(
                        v-text="study.name"
                        @click="show(study)")
        v-subheader.justify-center(v-else)
            .red--text No studies created yet, click the button below to create a new one.

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
                @cancel="hideEditor")
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

    isNew = false;
    editedStudy: Study | null = null;

    public edit( study: Study ) {
        this.isNew = false;
        this.editedStudy = Study.from( study );
    }

    public clone( study: Study ) {
        this.isNew = true;
        this.editedStudy = Study.from( study, true );
    }

    createNew() {
        this.isNew = true;
        this.editedStudy = new Study();
    }

    save( study: Study ) {
        if (this.isNew) {
            this.$store.commit( 'addStudy', study );
        }
        else {
            this.$store.commit( 'replaceStudy', study );
        }

        this.$store.dispatch( 'save' );

        this.hideEditor();
    }

    hideEditor() {
        this.editedStudy = null;
        this.$emit( 'update' );
    }

    show( study: Study ) {
        this.$emit( 'study', study );
    }
}
</script>
