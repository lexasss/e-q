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
                            v-chip(
                                :close="isNotUsed(quest)"
                                color="primary"
                                outlined
                                :class="{ 'red': isNotUsed(quest) }"
                                @click:close="del(quest)") {{ quest.name }}
                            .ml-4.pt-2.small {{ studies(quest) }}
            v-subheader.red--text(v-else v-text="'No questionnaires'")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Questionnaire from '@/models/questionnaire';
import Study from '@/models/study';

@Component({
    components: {
    },
})
export default class Questionnaires extends Vue {
    studies( quest: Questionnaire ) {
        if (quest.study === 0) {
            return 'public';
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
}
</script>

<style scoped lang="less">
.small {
    font-size: 0.75em;
}
</style>
