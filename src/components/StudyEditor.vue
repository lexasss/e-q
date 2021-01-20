<template lang="pug">
    .white
        template(v-if="!isEditingQuestionnaire")
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
                @add="addQuestionnaire"
                @edit="editQuestionnaire")
            
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

        template(v-else)
            questionnaire-editor(
                :study-id="canBePrivate ? study.id : 0"
                :reference="editingQuestionnaire"
                :is-new="!editingQuestionnaire"
                @save="addQuestionnaire"
                @cancel="hideEditor")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

const questionnaireList = () => import(/* webpackPrefetch: true */ /* webpackChunkName: "components" */ '@/components/QuestionnaireList.vue');
const questionnaireEditor = () => import(/* webpackPrefetch: true */ /* webpackChunkName: "components" */ '@/components/QuestionnaireEditor.vue');

import Questionnaire from '@/models/questionnaire';
import Study from '@/models/study';

@Component({
    components: {
        questionnaireList,
        questionnaireEditor,
    },
})
export default class StudyEditor extends Vue {

    @Prop({default: null})
    public study!: Study;

    isEditingQuestionnaire = false;
    editingQuestionnaire: Questionnaire | null = null;

    nameRules = [
        (value: string) => !!value || 'Required.',
        (value: string) => (value && value.length >= 3) || 'Min 3 characters',
    ];

    get isValidStudy() {
        return this.study.isValid;
    }

    get canBePrivate() {
        return this.editingQuestionnaire?.study ?? true;
    }

    editQuestionnaire( questionnaire: Questionnaire ) {
        if (questionnaire) {
            this.editingQuestionnaire = questionnaire;
            this.isEditingQuestionnaire = true;
        }
    }

    createQuestionnaire() {
        this.isEditingQuestionnaire = true;
    }

    addQuestionnaire(questionnaire: Questionnaire) {
        if (!this.editingQuestionnaire) {
            this.study.questionnaires.push( questionnaire.id );
        }

        this.hideEditor();
    }

    hideEditor() {
        this.editingQuestionnaire = null;
        this.isEditingQuestionnaire = false;
    }

    save() {
        this.$emit( 'save', this.study );
    }

    cancel() {
        this.$emit( 'cancel' );
    }
}
</script>
