<template lang="pug">
    .question-editor
        h2.subtitle.is-4 Question editor

        .field.is-horizontal
            .field-label.is-normal
                label.label Name
            .field-body
                .field
                    .control.is-expanded
                        input.input(type="text" placeholder="Question" v-model="qName")

        .field.is-horizontal
            .field-label.is-normal
            .field-body
                .field.has-text-left
                    label.checkbox
                        input(type="checkbox" v-model="qIsRequired")
                        span is required

        .field.is-horizontal
            .field-label.is-normal
                label.label Type
            .field-body
                .field.is-narrow
                    .control
                        .select.is-fullwidth
                            select(v-model="qType" @change="typeChanged")
                                option(v-for="(questionType, index) in questionTypes" :value="index") {{ questionType }}

        .field.is-horizontal(v-if="isText")
            .field-label.is-normal
                label.label Max length
            .field-body
                .field
                    .control.is-expanded
                        input.input(type="number" placeholder="Maximum length" min="0" v-model.number="qParams.maxLength")

        .field.is-horizontal(v-if="isNumber || isScale")
            .field-label.is-normal
                label.label Min
            .field-body
                 .field
                    .control.is-expanded
                        input.input(type="number" placeholder="Min" :max="qParams.max" v-model.number="qParams.min")
        .field.is-horizontal(v-if="isNumber || isScale")
            .field-label.is-normal
                label.label Max
            .field-body
                .field
                    .control.is-expanded
                        input.input(type="number" placeholder="Max" :min="qParams.min" v-model.number="qParams.max")

        .field.is-horizontal(v-if="isChoice")
            .field-label.is-normal
                label.label Options
            .field-body
                .field
                    .control(v-if="hasOptions")
                        .field.is-grouped(v-for="(item, i) in qParams.items")
                            button.button.is-danger.add-or-remove(@click="removeOption( i )") x
                            .option {{ (i + 1) + '.' }} {{ item }}
                    .info(v-else) No options, type some text into the box underneath and click '+' button to add.

                    .field.has-addons
                        .control.is-expanded
                            input.input(type="text" v-model="option")
                        .control
                            button.button.is-success(@click="addOption") +

        .field.is-horizontal(v-if="isScale")
            .field-label.is-normal
                label.label Left label
            .field-body
                .field
                    .control.is-expanded
                        input.input(type="text" v-model="qParams.labelLeft")
        .field.is-horizontal(v-if="isScale")
            .field-label.is-normal
                label.label Center label
            .field-body
                .field
                    .control.is-expanded
                        input.input(type="text" v-model="qParams.labelCenter")
        .field.is-horizontal(v-if="isScale")
            .field-label.is-normal
                label.label Right label
            .field-body
                .field
                    .control.is-expanded
                        input.input(type="text" v-model="qParams.labelRight")

        hr
        .buttons.is-right
            button.button.is-rounded.is-success(:disabled="!isValidQuestion" @click="save()") Save
            button.button.is-rounded.is-danger(@click="cancel()") Cancel
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Question, {
    QuestionType,
    QuestionAny,
    QuestionText,
    QuestionNumber,
    QuestionChoice,
    QuestionScale,
    QuestionParams } from '@/models/question';

@Component({
  components: {
  },
})
export default class QuestionEditor extends Vue {
    @Prop()
    public name!: string;

    @Prop({default: QuestionType.None})
    public type!: QuestionType;

    @Prop({default: null})
    public params!: QuestionAny;

    public qName = '';
    public qType = QuestionType.None;
    public qIsRequired = true;
    public qParams: Partial<QuestionParams> = {
        maxLength: 100,
        min: 0,
        max: 100,
        isMultiple: false,
        items: [] as string[],
        labelLeft: '',
        labelCenter: '',
        labelRight: '',
    };

    public questionTypes = [ '', 'text', 'number', 'one choice', 'multiple choices', 'scale' ];
    public maxLength = 0;
    public option = '';

    get isValidQuestion() {
        if (this.isChoice) {
            return this.qName.length > 0 && this.qParams.items?.length;
        }
        else {
            return this.qName.length > 0 && this.qType !== 0;
        }
    }

    get hasOptions() {
        return this.qParams.items?.length;
    }

    get isText() {
        return this.qType === QuestionType.Text;
    }

    get isNumber() {
        return this.qType === QuestionType.Number;
    }

    get isChoice() {
        return this.qType === QuestionType.ChoiceOne || this.qType === QuestionType.ChoiceMultiple;
    }

    get isScale() {
        return this.qType === QuestionType.Scale;
    }

    addOption() {
        (this.qParams as QuestionChoice).items.push( this.option );
        this.option = '';
    }

    removeOption( index: number ) {
        (this.qParams as QuestionChoice).items.splice( index, 1 );
    }

    create( type: QuestionType, params: Partial<QuestionAny> ) {
        let result: Question;

        switch (type) {
            case QuestionType.Text:
                result = new QuestionText(params as QuestionText);
                break;
            case QuestionType.Number:
                result = new QuestionNumber(params as QuestionNumber);
                break;
            case QuestionType.ChoiceOne:
                result = new QuestionChoice(params as QuestionChoice);
                break;
            case QuestionType.ChoiceMultiple:
                result = new QuestionChoice(params as QuestionChoice);
                break;
            case QuestionType.Scale:
                result = new QuestionScale(params as QuestionScale);
                break;
            default:
                throw new Error( 'Question: unknown type' );
        }

        result.name = this.qName;
        result.isRequired = this.qIsRequired;
        result.type = this.qType;

        return result;
    }

    save() {
        this.$emit( 'save', this.create( this.qType, this.qParams ) );
    }

    cancel() {
        this.$emit( 'cancel' );
    }

    typeChanged() {
        console.log(this.qType);
        switch (this.qType) {
            case QuestionType.ChoiceOne:
                (this.qParams as QuestionChoice).isMultiple = false;
                break;
            case QuestionType.ChoiceMultiple:
                (this.qParams as QuestionChoice).isMultiple = true;
                break;
        }
    }
}
</script>

<style scoped lang="less">
.questionnaire-editor {
    padding: 1em;
    background-color:  white;
}

input[type="checkbox"] {
    margin-right: 1em;
}

.option {
    line-height: 2.5em;
    vertical-align: middle;
    margin: 0 0.5em;
    text-align: left;
}

.info {
    font-style: italic;
    font-size: 0.75em;
    line-height: 2.5rem;
}
</style>
