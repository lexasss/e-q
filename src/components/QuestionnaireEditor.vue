<template lang="pug">
    .questionnaire-editor
        div(v-if="!isAddingQuestion")
            h2.subtitle.is-4 Questionnaire editor

            .field.is-horizontal
                .field-label.is-normal
                    label.label Name
                .field-body
                    .field
                        .control.is-expanded
                            input.input(type="text" placeholder="Questionnaire name" v-model="questionnaire.name")

            .field.is-horizontal
                .field-label.is-normal
                .field-body
                    .field.has-text-left
                        label.checkbox
                            input(type="checkbox" v-model="isPublic")
                            span is public

            .field.is-horizontal
                .field-label.is-normal
                    label.label Questions
                .field-body
                    .field
                        .control(v-if="questionnaire.items.length")
                            .field.is-grouped.questions(v-for="(item, index) in questionnaire.items")
                                button.button.is-danger.add-or-remove(@click="remove(item)") x
                                .question.is-expanded {{ index + 1 }}. {{ item.name }}
                                .required(v-show="item.isRequired") *
                        .control.info(v-else) No questions, click '+' button to add some.
                        .field.is-grouped
                            button.button.is-success.add-or-remove(@click="createNew()") +

            hr
            .buttons.is-right
                button.button.is-rounded.is-success(:disabled="!isValidQuestionnaire" @click="save()") Save
                button.button.is-rounded.is-danger(@click="cancel()") Cancel

        div(v-else)
            question-editor(@save="addQuestion" @cancel="hideEditor")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import QuestionEditor from '@/components/QuestionEditor.vue';

import Questionnaire from '@/models/questionnaire';
import Question from '@/models/question';

@Component({
  components: {
      'question-editor': QuestionEditor,
  },
})
export default class QuestionnaireEditor extends Vue {
    @Prop({default: 0})
    public studyId!: number;

    public questionnaire = new Questionnaire('');

    public isAddingQuestion = false;

    public get isValidQuestionnaire() {
        return this.questionnaire.isValid;
    }

    get isPublic() {
        return this.questionnaire.study === 0;
    }

    set isPublic( value: boolean ) {
        this.questionnaire.study = value ? 0 : this.studyId;
    }

    addQuestion( question: Question ) {
        this.isAddingQuestion = false;
        this.questionnaire.items.push( question );
    }

    hideEditor() {
        this.isAddingQuestion = false;
    }

    createNew() {
        this.isAddingQuestion = true;
    }

    remove( question: Question ) {
        const index = this.questionnaire.items.findIndex( item => item === question );
        this.questionnaire.items.splice( index, 1 );
    }

    save() {
        this.$store.commit( 'addQuestionnaire', this.questionnaire );
        this.$store.dispatch( 'save' );

        this.$emit( 'save', this.questionnaire );
    }

    cancel() {
        this.$emit( 'cancel' );
    }
}
</script>

<style scoped lang="less">
.questionnaire-editor {
    background-color:  white;
}

input[type="checkbox"] {
    margin-right: 1em;
}

.field.questions {
    margin-bottom: 0;
}

button.add-or-remove {
    width: 2.5em;
}

.question {
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

.required {
    color: red;
    line-height: 2.5rem;
}
</style>
