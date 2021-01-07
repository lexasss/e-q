<template lang="pug">
    .questionnaires
        .list(v-if="items.length")
            .field.is-grouped.item(v-for="item in items")
                questionnaire-item(:questionnaire="item" @remove="remove(item)")
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
    @Prop({ default: () => new Array<Questionnaire>() })
    public items!: Questionnaire[];

    @Prop({ default: 0 })
    public studyID!: number;

    public selectedQuestionnaire: Questionnaire | null = null;

    public get availableQuestionnaires() {
        return this.$store.state.questionnaires.filter( (item: Questionnaire) => {
            return item.study === this.studyID || !item.study;
        });
    }

    addExisting() {
        if (this.selectedQuestionnaire) {
            this.$emit('add', this.selectedQuestionnaire);
        }
    }

    remove(questionnaire: Questionnaire) {
        const index = this.items.findIndex( item => item === questionnaire );
        this.items.splice( index, 1 );
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
