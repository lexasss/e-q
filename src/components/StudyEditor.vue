<template lang="pug">
    .study-editor
        div(v-if="!isAddingQuestionnaire")
            h2.subtitle.is-4 Study editor

            .field.is-horizontal
                .field-label.is-normal
                    label.label Name
                .field-body
                    .field
                        .control.is-expanded
                            input.input(type="text" placeholder="Study name" v-model="study.name")

            .field.is-horizontal
                .field-label.is-normal
                    label.label Description
                .field-body
                    .field
                        .control.is-expanded
                            textarea.textarea(placeholder="Study description" v-model="study.description")

            .field.is-horizontal
                .field-label.is-normal
                    label.label Questionnaires
                .field-body
                    .field
                        .control.is-expanded
                            questionnaire-list(:study-id="study.id" :ids="study.questionnaires" @add="addQuestionnaire")
            
            .field.is-horizontal
                .field-label.is-normal
                .field-body
                    .field.is-grouped
                        .control
                            button.button.is-rounded.is-success(@click="createQuestionnaire()") Create new questionnaire

            hr
            .buttons.is-right
                button.button.is-rounded.is-success(:disabled="!isValidStudy" @click="save()") Save
                button.button.is-rounded.is-danger(@click="cancel()") Cancel

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

    public isAddingQuestionnaire = false;

    public get isValidStudy() {
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
