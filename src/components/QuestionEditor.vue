<template lang="pug">
    .question-editor
        .text-h5 Question editor

        v-text-field(
            v-model="name"
            label="Name"
            :rules="nameRules")
        v-switch(v-model="isRequired" label="required")

        v-select.text-left(
            v-model="type"
            :items="questionTypes"
            item-text="name"
            item-value="index"
            type="number"
            persistent-hint
            label="Type"
            single-line
            @change="typeChanged")

        template(v-if="isText")
            v-subheader Maximum length
            v-slider(
                v-model.number="params.maxLength"
                min="0"
                max="255"
                thumb-label)
                template(v-slot:append)
                    .ml-2 {{ params.maxLength }}

        template(v-if="isNumber || isScale")
            v-slider.mt-6(
                v-model.number="params.min"
                :min="isScale ? -10 : -1000"
                :max="params.max"
                label="Min"
                thumb-label)
                template(v-slot:append)
                    v-text-field.ma-0.pa-0.mt-n2(
                        v-model.number="params.min"
                        :min="isScale ? -10 : -1000"
                        :max="params.max"
                        type="number"
                        style="width: 60px"
                        solo
                        dense)

            v-slider(
                v-model.number="params.max"
                :min="params.min"
                :max="isScale ? 20 : 1000"
                label="Max"
                thumb-label)
                template(v-slot:append)
                    v-text-field.ma-0.pa-0.mt-n2(
                        v-model.number="params.max"
                        :min="params.min"
                        :max="isScale ? 20 : 1000"
                        type="number"
                        style="width: 60px"
                        solo
                        dense)

        template(v-if="isChoice")
            .subtitle-1.text-left Options
            v-list(dense)
                template(v-if="hasOptions")
                    v-list-item(
                        v-for="(item, index) in params.items"
                        :key="index")
                        v-list-item-content
                            v-chip(
                                close
                                color="primary"
                                outlined
                                @click:close="removeOption( index )") {{ item }}
                v-subheader.red--text(v-else v-text="'No options, type some text into the box underneath and click the button to add'")
            .d-flex
                v-text-field(
                    v-model="option"
                    solo
                    label="new option"
                    :rules="optionRules")
                v-btn.mx-2(
                    fab
                    dark
                    color="green"
                    :disabled="option === ''"
                    @click="addOption()")
                    v-icon(dark) mdi-plus
            v-switch(
                v-model="params.asDropdownList"
                :disabled="params.isMultiple"
                label="as a drop-down list")

        template(v-if="isScale")
            v-text-field(
                v-model="params.labelLeft"
                clearable
                label="Left label")
            v-text-field(
                v-model="params.labelCenter"
                clearable
                label="Center label")
            v-text-field(
                v-model="params.labelRight"
                clearable
                label="Right label")
            v-switch(v-model="params.hasSlider" label="as a slider")

        v-divider.my-4

        .text-right
            v-btn.mr-2(
                rounded
                dark
                color="green"
                :disabled="!isValidQuestion"
                @click="save()") Save
            v-btn(
                rounded
                dark
                color="red"
                @click="cancel()") Cancel
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
    name = '';
    type = QuestionType.None;
    isRequired = true;
    params: QuestionParams = {
        maxLength: 100,
        min: 0,
        max: 10,
        isMultiple: false,
        asDropdownList: false,
        items: [] as string[],
        labelLeft: 'min',
        labelCenter: '',
        labelRight: 'max',
        hasSlider: false,
    };

    questionTypes = [{
        index: QuestionType.Text,
        name: 'text',
    }, {
        index: QuestionType.Number,
        name: 'number',
    }, {
        index: QuestionType.ChoiceOne,
        name: 'one choice',
    }, {
        index: QuestionType.ChoiceMultiple,
        name: 'multiple choices',
    }, {
        index: QuestionType.Scale,
        name: 'scale',
    }];

    maxLength = 0;
    option = '';

    nameRules = [
        (value: string) => !!value || 'Required.',
        (value: string) => (value && value.length >= 2) || 'Min 2 characters',
    ];
    optionRules = [
        (value: string) => !!value || 'Required.',
    ];

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
