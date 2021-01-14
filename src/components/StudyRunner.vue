<template lang="pug">
    .study-runner.mx-auto
        .questionnaire-viewer(v-for="(questionnaire, questIndex) in participant.questionnaires" :key="questionnaire.id")
            .questionnaire(v-if="questIndex === questionnaireIndex")
                .text-h5 {{ name( questionnaire.id ) }}
                .text-subtitle-1.text-left.my-5 {{ description( questionnaire.id ) }}

                .text-left(v-for="(q, i) in questionnaire.answers" :key="q.id")

                    .text-subtitle-2.font-weight-black {{ (i + 1) + '.' }} {{ q.name }}
                        .d-inline.red--text.pl-1(v-if="q.isRequired") *

                    template(v-if="isText( q.type )")
                        v-text-field(
                            v-if="q.maxLength > 0"
                            type="text"
                            outlined
                            :counter="q.maxLength"
                            :maxlength="q.maxLength"
                            v-model.trim="q.value")
                        v-textarea(
                            v-else
                            outlined
                            v-model="q.value")

                    template(v-else-if="isNumber( q.type )")
                        v-text-field(
                            type="number"
                            outlined
                            :min="q.min"
                            :max="q.max"
                            v-model.trim="q.value")

                    template(v-else-if="isChoiceOne( q.type )")
                        v-select(
                            v-if="q.asDropdownList"
                            v-model="q.value"
                            :items="q.items"
                            outlined)
                        v-radio-group.mt-0(
                            v-else
                            v-model="q.value")
                            v-radio(
                                v-for="option in q.items"
                                :key="option"
                                :label="option"
                                :value="option")

                    .mb-4(v-else-if="isChoiceMultiple( q.type )")
                        v-checkbox.mt-0(
                            v-for="(option, index) in q.items"
                            v-model="q.value"
                            :key="index"
                            :label="option"
                            :value="option")

                    template(v-else-if="isScale( q.type )")
                        v-flex.flex-column
                            .d-flex.justify-space-between(:style="getScaleWidth(q.min, q.max)")
                                .d-inline-block {{ q.labelLeft }}
                                .d-inline-block {{ q.labelCenter }}
                                .d-inline-block {{ q.labelRight }}
                            v-flex(:style="getScaleWidth(q.min, q.max)")
                                v-container.pa-0(
                                    v-if="q.hasSlider"
                                    fluid)
                                    v-slider(
                                        :min="q.min"
                                        :max="q.max"
                                        v-model="q.value"
                                        ticks="always"
                                        tick-size="4"
                                        thumb-label)
                                v-radio-group.my-0(
                                    v-else
                                    row
                                    v-model="q.value")
                                    v-radio.ma-0.pa-0(
                                        v-for="option in range(q.min, q.max)"
                                        :key="option"
                                        :value="option")

                .d-flex
                    v-btn.ml-2(
                        dark
                        color="blue"
                        :disabled="hasEmptyRequired"
                        @click="next()")  {{ nextButtonLabel }}
                    v-spacer
                    v-btn.ml-2(
                        dark
                        color="red"
                        @click="interrupt()") Interrupt
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Study from '@/models/study';
import Participant from '@/models/participant';
import { QuestionType } from '@/models/question';
import Questionnaire from '@/models/questionnaire';

@Component({
    components: {
    },
})
export default class StudyRunner extends Vue {

    @Prop({default: null})
    public study!: Study;

    @Prop({default: ''})
    public participantName!: string;

    participant: Participant | null = null;
    questionnaireIndex = 0;

    get hasEmptyRequired() {
        const quest = this.participant?.questionnaires[ this.questionnaireIndex ];
        return quest?.answers.some( item => item.isRequired ? !item.isAnswered : false );
    }

    get nextButtonLabel() {
        return this.questionnaireIndex < (this.participant?.questionnaires.length ?? 0) - 1 ? 'Next' : 'Finish';
    }

    name( id: number ) {
        return (this.$store.state.questionnaires.find( (item: Questionnaire) => {
            return item.id === id;
        }) as Questionnaire).name;
    }

    description( id: number ) {
        return (this.$store.state.questionnaires.find( (item: Questionnaire) => {
            return item.id === id;
        }) as Questionnaire).description;
    }

    isText(type: QuestionType) {
        return type === QuestionType.Text;
    }

    isNumber(type: QuestionType) {
        return type === QuestionType.Number;
    }

    isChoiceOne(type: QuestionType) {
        return type === QuestionType.ChoiceOne;
    }

    isChoiceMultiple(type: QuestionType) {
        return type === QuestionType.ChoiceMultiple;
    }

    isScale(type: QuestionType) {
        return type === QuestionType.Scale;
    }

    range( min: number, max: number ) {
        const result = [];
        for (let i = min; i <= max; i += 1) {
            result.push( i );
        }
        return result;
    }

    getScaleWidth( min: number, max: number ) {
        return `width: ${36 * (max - min + 1)}px; min-width: 500px`;
    }

    next() {
        if (this.questionnaireIndex < (this.participant?.questionnaires.length ?? 0) - 1) {
            this.questionnaireIndex++;
        }
        else {
            this.$emit( 'finished', this.participant );
        }
    }

    interrupt() {
        this.$emit( 'finished' );
    }

    created() {
        const questionnaires = this.study.questionnaires.map( id => {
            const questionnaire = this.$store.state.questionnaires.find( (item: Questionnaire) => {
                return item.id === id;
            }) as Questionnaire;
            return questionnaire;
        });

        this.participant = new Participant( this.participantName, questionnaires );
    }
}
</script>

<style scoped lang="less">
.study-runner {
    max-width: 920px;
}
</style>

<style>
.v-input--radio-group--row .v-input--radio-group__input {
    justify-content: space-between !important;
}

.v-input--checkbox .v-messages {
    min-height: 0 !important;
}
</style>
