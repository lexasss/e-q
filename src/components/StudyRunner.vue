<template lang="pug">
    .study-runner
        .questionnaire-viewer(v-for="(questionnaire, questIndex) in participant.questionnaires" :key="questionnaire.id")
            .questionnaire(v-if="questIndex === questionnaireIndex")
                h5.subtitle.is-5 {{ questionnaire.name }}
                .field.has-text-left(v-for="(q, i) in questionnaire.items" :key="q.id")
                    label.label {{ (i + 1) + '.' }} {{ q.name }}
                        .is-required(v-if="q.isRequired") *
                    .control(v-if="isText( q.type )")
                        input.input(v-if="q.maxLength > 0" type="text" :maxlength="q.maxLength" v-model.trim="q.value")
                        textarea.textarea(v-else v-model="q.value")
                    .control(v-else-if="isNumber( q.type )")
                        input.input(type="number" :min="q.min" :max="q.max" v-model.number="q.value")
                    .control(v-else-if="isChoiceOne( q.type )")
                        .field.answer-item(v-for="option in q.items")
                            input(type="radio" :id="q.id + '-' + option" :value="option" v-model="q.value")
                            label.item-label(:for="q.id + '-' + option") {{ option }}
                    .control(v-else-if="isChoiceMultiple( q.type )")
                        .field.answer-item(v-for="option in q.items")
                            input(type="checkbox" :id="q.id + '-' + option" :value="option" v-model="q.value")
                            label.item-label(:for="q.id + '-' + option") {{ option }}
                    .control(v-else-if="isScale( q.type )")
                        .scale-items
                            .scale-items-row
                                .scale-item(v-for="option in range(q.min, q.max)")
                                    input(type="radio" :value="option" v-model="q.value")
                        .scale-labels
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

@Component({
    components: {
    },
})
export default class StudyRunner extends Vue {
    @Prop({default: null})
    public study!: Study;

    @Prop({default: ''})
    public participantName!: string;

    public participant: Participant = new Participant( this.participantName, this.study );
    public questionnaireIndex = 0;

    get hasEmptyRequired() {
        const quest = this.participant.questionnaires[ this.questionnaireIndex ];
        return quest.items.some( item => item.isRequired ? !item.isAnswered : false );
    }

    get nextButtonLabel() {
        return this.questionnaireIndex < this.participant.questionnaires.length - 1 ? 'Next' : 'Finish';
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

    next() {
        if (this.questionnaireIndex < this.participant.questionnaires.length - 1) {
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
        // ok
    }

    mounted() {
        // ok
    }
}
</script>

<style scoped lang="less">
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

.scale-labels {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.scale-label {
    display: flex;
}

.scale-items {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.scale-items-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0.25em 0; 
}

.scale-item {
    display: flex;
}
</style>
