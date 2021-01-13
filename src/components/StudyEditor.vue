<template lang="pug">
    .study-editor
        div(v-if="!isAddingQuestionnaire")
            .text-h5 Study editor

            v-text-field(
                v-model="study.name"
                label="Name"
                :rules="nameRules")
            v-textarea(
                v-model="study.description"
                label="Description")

            .subtitle-1.text-left Questionnaires
            questionnaire-list(
                :study-id="study.id"
                :ids="study.questionnaires"
                @add="addQuestionnaire")
            
            v-btn(
                block
                dark
                color="green"
                @click="createQuestionnaire()") Create new questionnaire

            v-divider.my-4

            .text-right
                v-btn.mr-2(
                    rounded
                    dark
                    color="green"
                    :disabled="!isValidStudy"
                    @click="save()") Save
                v-btn(
                    rounded
                    dark
                    color="red"
                    @click="cancel()") Cancel

        div(v-else)
            questionnaire-editor(:study-id="study.id" @save="addQuestionnaire" @cancel="hideEditor")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import QuestionnaireList from '@/components/QuestionnaireList.vue';
import QuestionnaireEditor from '@/components/QuestionnaireEditor.vue';

import Questionnaire from '@/models/questionnaire';
import Study from '@/models/study';

@Component({
  components: {
      'questionnaire-list': QuestionnaireList,
      'questionnaire-editor': QuestionnaireEditor,
  },
})
export default class StudyEditor extends Vue {
    @Prop({default: null})
    public study!: Study;

    isAddingQuestionnaire = false;

    nameRules = [
        (value: string) => !!value || 'Required.',
        (value: string) => (value && value.length >= 3) || 'Min 3 characters',
    ];

    get isValidStudy() {
        return this.study.isValid;
    }

    createQuestionnaire() {
        this.isAddingQuestionnaire = true;
    }

    addQuestionnaire(questionnaire: Questionnaire) {
        this.isAddingQuestionnaire = false;
        this.study.questionnaires.push( questionnaire.id );
    }

    hideEditor() {
        this.isAddingQuestionnaire = false;
    }

    save() {
        this.$emit( 'save', this.study );
    }

    cancel() {
        this.$emit( 'cancel' );
    }
}
</script>

<style scoped lang="less">
.study-editor {
    padding: 1em;
    background-color:  white;
}
</style>
