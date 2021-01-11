<template lang="pug">
    .question-editor
        h2.subtitle.is-4 Question editor

        .field.is-horizontal
            .field-label.is-normal
                label.label Name
            .field-body
                .field
                    .control.is-expanded
                        input.input(type="text" placeholder="Question" v-model="name")

        .field.is-horizontal
            .field-label.is-normal
            .field-body
                .field.has-text-left
                    label.checkbox
                        input(type="checkbox" v-model="isRequired")
                        span is required

        .field.is-horizontal
            .field-label.is-normal
                label.label Type
            .field-body
                .field.is-narrow
                    .control
                        .select.is-fullwidth
                            select(v-model="type" @change="typeChanged")
                                option(v-for="(questionType, index) in questionTypes" :value="index + 1") {{ questionType }}

        .field.is-horizontal(v-if="isText")
            .field-label.is-normal
                label.label Max length
            .field-body
                .field
                    .control.is-expanded
                        input.input(type="number" placeholder="Maximum length" min="0" v-model.number="params.maxLength")

        .field.is-horizontal(v-if="isNumber || isScale")
            .field-label.is-normal
                label.label Min
            .field-body
                 .field
                    .control.is-expanded
                        input.input(type="number" placeholder="Min" :max="params.max" v-model.number="params.min")
        .field.is-horizontal(v-if="isNumber || isScale")
            .field-label.is-normal
                label.label Max
            .field-body
                .field
                    .control.is-expanded
                        input.input(type="number" placeholder="Max" :min="params.min" v-model.number="params.max")

        .field.is-horizontal(v-if="isChoice")
            .field-label.is-normal
                label.label Options
            .field-body
                .field
                    .control(v-if="hasOptions")
                        .field.is-grouped(v-for="(item, i) in params.items")
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
                        input.input(type="text" v-model="params.labelLeft")
        .field.is-horizontal(v-if="isScale")
            .field-label.is-normal
                label.label Center label
            .field-body
                .field
                    .control.is-expanded
                        input.input(type="text" v-model="params.labelCenter")
        .field.is-horizontal(v-if="isScale")
            .field-label.is-normal
                label.label Right label
            .field-body
                .field
                    .control.is-expanded
                        input.input(type="text" v-model="params.labelRight")

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
    public name = '';
    public type = QuestionType.None;
    public isRequired = true;
    public params: QuestionParams = {
        maxLength: 100,
        min: 0,
        max: 100,
        isMultiple: false,
        items: [] as string[],
        labelLeft: 'min',
        labelCenter: '',
        labelRight: 'max',
        hasSlider: false,
    };

    public questionTypes = [ 'text', 'number', 'one choice', 'multiple choices', 'scale' ];
    public maxLength = 0;
    public option = '';

    get isValidQuestion() {
        if (this.isChoice) {
            return this.name.length > 0 && this.params.items?.length;
        }
        else {
            return this.name.length > 0 && this.type !== 0;
        }
    }

    get hasOptions() {
        return this.params.items?.length;
    }

    get isText() {
        return this.type === QuestionType.Text;
    }

    get isNumber() {
        return this.type === QuestionType.Number;
    }

    get isChoice() {
        return this.type === QuestionType.ChoiceOne || this.type === QuestionType.ChoiceMultiple;
    }

    get isScale() {
        return this.type === QuestionType.Scale;
    }

    addOption() {
        this.params.items.push( this.option );
        this.option = '';
    }

    removeOption( index: number ) {
        this.params.items.splice( index, 1 );
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

        result.name = this.name;
        result.isRequired = this.isRequired;
        result.type = this.type;

        return result;
    }

    save() {
        this.$emit( 'save', this.create( this.type, this.params ) );
    }

    cancel() {
        this.$emit( 'cancel' );
    }

    typeChanged() {
        switch (this.type) {
            case QuestionType.ChoiceOne:
                this.params.isMultiple = false;
                break;
            case QuestionType.ChoiceMultiple:
                this.params.isMultiple = true;
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
