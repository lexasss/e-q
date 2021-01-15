<template lang="pug">
    .questionnaire-list
        .text-left(v-if="ids.length")
            v-chip-group(column)
                draggable(
                    :list="ids"
                    @change="onSwapped")
                    v-chip.mr-2(
                        v-for="(id, index) in ids"
                        :key="index"
                        draggable
                        color="primary"
                        outlined
                        :class="{ 'font-italic': isPrivate(id) }"
                        __unused__close
                        @__unused__click:close="remove(id)") {{ getName(id) }}
                        v-spacer.ml-4
                        v-tooltip(bottom)
                            template(v-slot:activator="{ on: tooltip }")
                                v-btn(
                                    icon
                                    :disabled="hasParticipants(id)"
                                    color="primary"
                                    v-on="{ ...tooltip }"
                                    @click="edit(id)")
                                    v-icon() mdi-pencil
                            span Edit
                        v-tooltip(bottom)
                            template(v-slot:activator="{ on: tooltip }")
                                v-btn(
                                    icon
                                    color="primary"
                                    v-on="{ ...tooltip }"
                                    @click="remove(id)")
                                    v-icon() mdi-close-circle
                            span Delete

        v-subheader.red--text(v-else) No questionnaires, select some existing from the list below or create a new one. 

        .d-flex
            v-select.mb-2.text-left(
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

    getQuestionnaire( id: number ) {
        return this.$store.state.questionnaires.find( (item: Questionnaire) => item.id === id ) as Questionnaire;
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
        const questionnaire = this.getQuestionnaire( id );
        return !!questionnaire.study;
    }

    getName( id: number ) {
        const questionnaire = this.getQuestionnaire( id );
        return questionnaire.name;
    }

    hasParticipants( id: number ) {
        return this.$store.state.studies.some( (item: Study) => {
            return item.questionnaires.indexOf( id ) >= 0 && item.participants.length > 0;
        });
    }

    edit( id: number ) {
        const questionnaire = this.getQuestionnaire( id );
        this.$emit('edit', questionnaire);
    }

    remove( id: number ) {
        const index = this.ids.findIndex( item => item === id );
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
