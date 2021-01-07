<template lang="pug">
    .questionnaire-list
        .list(v-if="ids.length")
            .field.is-grouped.item(v-for="id in ids")
                questionnaire-item(:questionnaire-id="id" @remove="remove(id)")
        .info(v-else) No questionnaires, select some existing from the list below or create a new one. 

        .field.is-grouped
            .control.is-expanded
                .select
                    select(v-model="selectedQuestionnaire")
                        option(v-for="questionnaire in availableQuestionnaires" :value="questionnaire") {{ questionnaire.name }}
            button.button.is-success(:disabled="!selectedQuestionnaire" @click="addExisting()") +
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import QuestionnaireItem from '@/components/QuestionnaireItem.vue';

import Questionnaire from '@/models/questionnaire';
import Study from '@/models/study';


@Component({
    components: {
        'questionnaire-item': QuestionnaireItem,
    },
})
export default class QuestionnaireList extends Vue {
    @Prop({ default: () => new Array<number>() })
    public ids!: number[];

    @Prop({ default: 0 })
    public studyId!: number;

    public selectedQuestionnaire: Questionnaire | null = null;

    public get availableQuestionnaires() {
        return this.$store.state.questionnaires.filter( (item: Questionnaire) => {
            return item.study === this.studyId || !item.study;
        });
    }

    addExisting() {
        if (this.selectedQuestionnaire) {
            this.$emit('add', this.selectedQuestionnaire);
        }
    }

    remove(questionnaireID: number) {
        const index = this.ids.findIndex( id => id === questionnaireID );
        this.ids.splice( index, 1 );
    }
}
</script>

<style scoped lang="less">
select {
    min-width: 10em;
}

.select {
    width: 100%;

    select {
        width: 100%;
    }
}

.info {
    font-style: italic;
    font-size: 0.75em;
    line-height: 2.5rem;
}
</style>
