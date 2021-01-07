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
                            input.input(type="text" placeholder="Questionnaire name" v-model="qQuestionnaire.name")

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
                        .control(v-if="qQuestionnaire.items.length")
                            .field.is-grouped.questions(v-for="(item, index) in qQuestionnaire.items")
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
export default class StudyEditor extends Vue {
    @Prop({default: null})
    public questionnaire!: Questionnaire;

    @Prop({default: 0})
    public studyID!: number;

    public qQuestionnaire = new Questionnaire('');

    public isAddingQuestion = false;

    public get isValidQuestionnaire() {
        return this.qQuestionnaire.isValid;
    }

    get isPublic() {
        return this.qQuestionnaire.study === 0;
    }

    set isPublic( value: boolean ) {
        this.qQuestionnaire.study = value ? 0 : this.studyID;
    }

    addQuestion( question: Question ) {
        this.isAddingQuestion = false;
        this.qQuestionnaire.items.push( question );
    }

    hideEditor() {
        this.isAddingQuestion = false;
    }

    createNew() {
        this.isAddingQuestion = true;
    }

    remove( question: Question ) {
        const index = this.qQuestionnaire.items.findIndex( item => item === question );
        this.qQuestionnaire.items.splice( index, 1 );
    }

    save() {
        this.$store.commit( 'addQuestionnaire', this.qQuestionnaire );
        this.$store.dispatch( 'save' );

        this.$emit( 'save', this.qQuestionnaire );
    }

    cancel() {
        this.$emit( 'cancel' );
    }

    created() {
        if (this.questionnaire) {
            this.qQuestionnaire.copyFrom( this.questionnaire );
        }
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
