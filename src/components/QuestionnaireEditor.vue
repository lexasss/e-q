<template lang="pug">
    .questionnaire-editor
        div(v-if="!isAddingQuestion")
            .text-h5 Questionnaire editor

            v-text-field(
                v-model="questionnaire.name"
                label="Name"
                :rules="nameRules")
            v-textarea(
                v-model="questionnaire.description"
                label="Description")
            v-switch(
                v-model="isPublic"
                label="public")

            v-list(dense)
                .subtitle-1.text-left Questions
                template(v-if="questionnaire.items.length")
                    v-list-item(
                        v-for="(item, index) in questionnaire.items"
                        :key="index")
                        v-list-item-content
                            .d-flex
                                v-chip(
                                    close
                                    color="primary"
                                    outlined
                                    @click:close="remove(item)") {{ item.name }}
                                .red--text(v-if="item.isRequired") *
                v-subheader.red--text(v-else v-text="'No questions, click the button below to add some.'")
            
            v-btn(
                block
                dark
                color="green"
                @click="createNew()") Add a question

            v-divider.my-4

            .text-right
                v-btn.mr-2(
                    rounded
                    dark
                    color="green"
                    :disabled="!isValidQuestionnaire"
                    @click="save()") Save
                v-btn(
                    rounded
                    dark
                    color="red"
                    @click="cancel()") Cancel

        div(v-else)
            question-editor(@save="addQuestion" @cancel="hideEditor")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import QuestionEditor from '@/components/QuestionEditor.vue';

import Questionnaire from '@/models/questionnaire';
import Question from '@/models/question';

@Component({
  components: {
      'question-editor': QuestionEditor,
  },
})
export default class QuestionnaireEditor extends Vue {
    @Prop({default: 0})
    public studyId!: number;

    questionnaire = new Questionnaire('');

    isAddingQuestion = false;

    nameRules = [
        (value: string) => !!value || 'Required.',
        (value: string) => (value && value.length >= 3) || 'Min 3 characters',
    ];

    get isValidQuestionnaire() {
        return this.questionnaire.isValid;
    }

    get isPublic() {
        return this.questionnaire.study === 0;
    }

    set isPublic( value: boolean ) {
        this.questionnaire.study = value ? 0 : this.studyId;
    }

    addQuestion( question: Question ) {
        this.isAddingQuestion = false;
        this.questionnaire.items.push( question );
    }

    hideEditor() {
        this.isAddingQuestion = false;
    }

    createNew() {
        this.isAddingQuestion = true;
    }

    remove( question: Question ) {
        const index = this.questionnaire.items.findIndex( item => item === question );
        this.questionnaire.items.splice( index, 1 );
    }

    save() {
        this.$store.commit( 'addQuestionnaire', this.questionnaire );
        this.$store.dispatch( 'save' );

        this.$emit( 'save', this.questionnaire );
    }

    cancel() {
        this.$emit( 'cancel' );
    }
}
</script>
