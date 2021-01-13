<template lang="pug">
    .questionnaire-list
        .mb-2.text-left(v-if="ids.length")
            v-chip-group(column)
                draggable(:list="ids" @change="onSwapped")
                    v-chip.ma-2(
                        v-for="(id, index) in ids"
                        :key="index"
                        close
                        draggable
                        color="primary"
                        outlined
                        :class="{ 'font-italic': isPrivate(id) }"
                        @click:close="remove(id)") {{ getName(id) }}
        v-subheader.red--text(v-else) No questionnaires, select some existing from the list below or create a new one. 

        .d-flex
            v-select.text-left(
                v-model="selectedQuestionnaire"
                :items="availableQuestionnaires"
                item-text="name"
                return-object
                label="Existing questionnaires"
                ref="list"
                @change="addQuestionnaire")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';

import Questionnaire from '@/models/questionnaire';
import Study from '@/models/study';


@Component({
    components: {
        draggable,
    },
})
export default class QuestionnaireList extends Vue {

    @Prop({ default: () => new Array<number>() })
    public ids!: number[];

    @Prop({ default: 0 })
    public studyId!: number;

    selectedQuestionnaire: Questionnaire | null = null;

    get availableQuestionnaires() {
        return this.$store.state.questionnaires.filter( (item: Questionnaire) => {
            return item.study === this.studyId || !item.study;
        });
    }

    addQuestionnaire( questionnaire: Questionnaire ) {
        if (questionnaire) {
            this.$emit('add', questionnaire);
            this.$nextTick().then(() => {
                this.selectedQuestionnaire = null;
                (this.$refs.list as HTMLElement).blur();
            });
        }
    }

    isPrivate( id: number ) {
        const questionnaire = this.$store.state.questionnaires.find( (item: Questionnaire) => {
            return item.id === id; }) as Questionnaire;
        return !!questionnaire.study;
    }

    getName( id: number ) {
        const questionnaire = this.$store.state.questionnaires.find( (item: Questionnaire) => {
            return item.id === id; }) as Questionnaire;
        return questionnaire.name;
    }

    remove( questID: number ) {
        const index = this.ids.findIndex( id => id === questID );
        this.ids.splice( index, 1 );
    }

    onSwapped( event: any ) {
        if (event.moved) {
            const temp = this.ids[ event.oldIndex ];
            this.ids[ event.oldIndex ] = this.ids[ event.newIndex ];
            this.ids[ event.newIndex ] = temp;
        }
    }
}
</script>
