<template lang="pug">
    .study-runner
        .questionnaire-viewer(v-for="(questionnaire, questIndex) in participant.questionnaires" :key="questionnaire.id")
            .questionnaire(v-if="questIndex === questionnaireIndex")
                h5.subtitle.is-5 {{ name( questionnaire.id ) }}
                h6.subtitle.is-6.has-text-left {{ description( questionnaire.id ) }}

                .field.has-text-left(v-for="(q, i) in questionnaire.answers" :key="q.id")
                    label.label {{ (i + 1) + '.' }} {{ q.name }}
                        .is-required(v-if="q.isRequired") *
                    .control(v-if="isText( q.type )")
                        input.input(v-if="q.maxLength > 0" type="text" :maxlength="q.maxLength" v-model.trim="q.value")
                        textarea.textarea(v-else v-model="q.value")
                    .control(v-else-if="isNumber( q.type )")
                        input.input(type="number" :min="q.min" :max="q.max" v-model.number="q.value")
                    .control(v-else-if="isChoiceOne( q.type )")
                        .field(v-if="q.asDropdownList")
                            .select
                                select(v-model="q.value")
                                    option(v-for="option in q.items" :value="option") {{ option }}
                        .field(v-else)
                            .answer-item(v-for="option in q.items")
                                input(type="radio" :id="q.id + '-' + option" :value="option" v-model="q.value")
                                label.item-label(:for="q.id + '-' + option") {{ option }}
                    .control(v-else-if="isChoiceMultiple( q.type )")
                        .field.answer-item(v-for="option in q.items")
                            input(type="checkbox" :id="q.id + '-' + option" :value="option" v-model="q.value")
                            label.item-label(:for="q.id + '-' + option") {{ option }}
                    .control(v-else-if="isScale( q.type )")
                        .scale-items
                            .scale-items-row(:style="getScaleWidth(q.min, q.max)")
                                .scale-as-slider(v-if="q.hasSlider")
                                    v-slider(:min="q.min" :max="q.max" v-model="q.value" ticks="always" tick-size="4" thumb-label)
                                .scale-as-options.is-flex(v-else)
                                    .scale-item(v-for="option in range(q.min, q.max)")
                                        input(type="radio" :value="option" v-model="q.value")
                            .scale-labels(:style="getScaleWidth(q.min, q.max)")
                                .scale-label {{ q.labelLeft }}
                                .scale-label {{ q.labelCenter }}
                                .scale-label {{ q.labelRight }}

                .field.is-grouped.is-align-items-stretch
                    .control
                        button.button.is-info(:disabled="hasEmptyRequired" @click="next()") {{ nextButtonLabel }}
                    .control
                        button.button.is-danger(@click="interrupt()") Interrupt
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

    public participant: Participant | null = null;
    public questionnaireIndex = 0;

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
        return `width: ${32 * (max - min + 1)}px`;
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
    margin: 0 auto;
}

.is-required {
    display: inline;
    color: red;
    padding-left: 0.25em;
}

.item-label {
    margin-left: 0.5em;
}

.answer-item {
    margin-left: 1em;
}

.is-full-width {
    width: 100%;
}

.scale-items {
    display: flex;
    flex-direction: column;
}

.scale-items-row {
    display: flex;
    padding: 0.25em 0; 
    margin: 0 auto;
    max-width: 100%;
}

.scale-labels {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 100%;
}

.scale-label {
    display: flex;
}

.scale-as-slider {
    width: 100%;
    justify-content: space-between;
}

.scale-as-options {
    width: 100%;
    justify-content: space-between;
}

select {
    min-width: 11em;
}
</style>
