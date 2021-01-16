<template lang="pug">
    .questionnaires
        .text-h4.my-4 Questionnaires

        v-list(
            v-if="$store.state.questionnaires.length"
            dense)
            v-list-item(
                v-for="quest in $store.state.questionnaires"
                :key="quest.id")
                v-list-item-content
                    .d-flex.justify-center
                        v-badge(
                            offset-y="14"
                            :color="cannotUse(quest) ? 'red' : 'primary'"
                            :value="!!quest.study"
                            :content="studies(quest)")
                            v-chip(
                                style="min-width: 420px"
                                color="primary"
                                :class="{ 'red': isNotUsed(quest) }"
                                :__unused__close="isNotUsed(quest)"
                                @__unused__click:close="remove(quest)"
                                outlined) {{ quest.name }}
                                v-spacer.ml-4
                                v-tooltip(bottom)
                                    template(v-slot:activator="{ on: tooltip }")
                                        v-btn(
                                            icon
                                            :disabled="hasParticipants(quest)"
                                            color="primary"
                                            v-on="{ ...tooltip }"
                                            @click="edit(quest)")
                                            v-icon() mdi-pencil
                                    span Edit
                                v-tooltip(bottom)
                                    template(v-slot:activator="{ on: tooltip }")
                                        v-btn(
                                            icon
                                            color="primary"
                                            v-on="{ ...tooltip }"
                                            @click="clone(quest)")
                                            v-icon() mdi-book-multiple
                                    span Clone
                                v-tooltip(bottom)
                                    template(v-slot:activator="{ on: tooltip }")
                                        v-btn(
                                            icon
                                            :disabled="!isNotUsed(quest)"
                                            color="primary"
                                            v-on="{ ...tooltip }"
                                            @click="remove(quest)")
                                            v-icon() mdi-close-circle
                                    span Delete
        v-subheader.justify-center(v-else)
            .red--text No questionnaires created yet.

        v-btn.mt-4(
            dark
            color="green"
            @click="createNew()") Create new

        v-dialog(
            v-if="isEditingQuestionnaire"
            :value="true"
            persistent
            max-width="640px")
            questionnaire-editor.pa-4(
                :study-id="0"
                :reference="reference"
                :is-new="isNewQuestionnare"
                @save="hideEditor"
                @cancel="hideEditor")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import QuestionnaireEditor from '@/components/QuestionnaireEditor.vue';

import Questionnaire from '@/models/questionnaire';
import Study from '@/models/study';

@Component({
    components: {
        'questionnaire-editor': QuestionnaireEditor,
    },
})
export default class Questionnaires extends Vue {

    isEditingQuestionnaire = false;
    isNewQuestionnare = false;
    reference: Questionnaire | null = null;

    studies( quest: Questionnaire ) {
        if (quest.study === 0) {
            return '';
        }
        else {
            const study = this.$store.state.studies.find( (item: Study) => item.id === quest.study );
            return study ? study.name : 'not used';
        }
    }

    isNotUsed( quest: Questionnaire ) {
        if (quest.study === 0) {
            return !this.$store.state.studies.some( (item: Study) => {
                return item.questionnaires.some( id => id === quest.id );
            });
        }
        else {
            return !this.$store.state.studies.find( (item: Study) => item.id === quest.study );
        }
    }

    hasParticipants( quest: Questionnaire ) {
        return this.$store.state.studies.some( (study: Study) => {
            return study.questionnaires.some( id => id === quest.id ) && study.participants.length > 0;
        });
    }

    cannotUse( quest: Questionnaire ) {
        if (quest.study !== 0) {
            return !this.$store.state.studies.find( (study: Study) => study.id === quest.study );
        }
        else {
            return false;
        }
    }

    edit( quest: Questionnaire ) {
        this.isNewQuestionnare = false;
        this.reference = quest;
        this.isEditingQuestionnaire = true;
    }

    clone( quest: Questionnaire ) {
        this.isNewQuestionnare = true;
        this.reference = quest;
        this.isEditingQuestionnaire = true;
    }

    remove( quest: Questionnaire ) {
        let isAllowed = true;
        if (quest.study === 0) {
            isAllowed = window.confirm( 'Are you sure to delete this questionnaire?' );
        }

        if (isAllowed) {
            this.$store.commit( 'deleteQuestionnaire', quest );
            this.$store.dispatch( 'save' );
        }
    }

    createNew() {
        this.isNewQuestionnare = false;
        this.reference = null;
        this.isEditingQuestionnaire = true;
    }

    hideEditor() {
        this.isEditingQuestionnaire = false;
    }
}
</script>
