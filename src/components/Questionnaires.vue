<template lang="pug">
    .questionnaires
        .text-h4.my-4 Questionnaires

        v-list(dense)
            template(v-if="$store.state.questionnaires.length")
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
                                    :close="isNotUsed(quest)"
                                    color="primary"
                                    :class="{ 'red': isNotUsed(quest) }"
                                    outlined
                                    @click:close="del(quest)") {{ quest.name }}
                                    v-btn.mr-n2(
                                        icon
                                        color="primary"
                                        @click="clone(quest)")
                                        v-icon(small) mdi-book-multiple
            v-subheader.red--text(
                v-else
                v-text="'No questionnaires'")

            v-btn.mt-4(
                dark
                color="green"
                @click="createNew()") Create new

        v-dialog(
            v-if="isAddingQuestionnaire"
            :value="true"
            persistent
            max-width="640px")
            questionnaire-editor.pa-4(
                :study-id="0"
                :reference="reference"
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

    isAddingQuestionnaire = false;
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

    cannotUse( quest: Questionnaire ) {
        if (quest.study !== 0) {
            return !this.$store.state.studies.find( (item: Study) => item.id === quest.study );
        }
        else {
            return false;
        }
    }

    del( quest: Questionnaire ) {
        let isAllowed = true;
        if (quest.study === 0) {
            isAllowed = window.confirm( 'Are you sure to delete this questionnaire?' );
        }

        if (isAllowed) {
            this.$store.commit( 'deleteQuestionnaire', quest );
            this.$store.dispatch( 'save' );
        }
    }

    clone( quest: Questionnaire ) {
        this.reference = quest;
        this.isAddingQuestionnaire = true;
    }

    createNew() {
        this.isAddingQuestionnaire = true;
    }

    hideEditor() {
        this.isAddingQuestionnaire = false;
        this.reference = null;
    }
}
</script>
