<template lang="pug">
    .white
        template(v-if="!isEditingQuestion")
            .text-h5 Questionnaire editor

            v-text-field(
                v-model="questionnaire.name"
                label="Name"
                :rules="nameRules")
            v-textarea(
                v-model="questionnaire.description"
                label="Description")
            v-switch(
                :disabled="isPublicOnly"
                v-model="isPublic"
                label="public")

            .subtitle-1.text-left Questions
                v-list(
                    v-if="questionnaire.items.length"
                    dense)
                    draggable.d-flex.flex-column(
                        :list="questionnaire.items"
                        @change="onSwapped")
                        v-chip.mt-1(
                            v-for="(item, index) in questionnaire.items"
                            :key="index"
                            color="primary"
                            __unused__close
                            @__unused__click:close="remove(item)"
                            outlined) {{ item.name }}
                            .red--text(v-if="item.isRequired") *
                            v-spacer.ml-4
                            v-tooltip(bottom)
                                template(v-slot:activator="{ on: tooltip }")
                                    v-btn(
                                        icon
                                        color="primary"
                                        v-on="{ ...tooltip }"
                                        @click="edit(item)")
                                        v-icon() mdi-pencil
                                span Edit
                            v-tooltip(bottom)
                                template(v-slot:activator="{ on: tooltip }")
                                    v-btn(
                                        icon
                                        color="primary"
                                        v-on="{ ...tooltip }"
                                        @click="clone(item)")
                                        v-icon() mdi-book-multiple
                                span Clone
                            v-tooltip(bottom)
                                template(v-slot:activator="{ on: tooltip }")
                                    v-btn(
                                        icon
                                        color="primary"
                                        v-on="{ ...tooltip }"
                                        @click="remove(item)")
                                        v-icon() mdi-close-circle
                                span Delete
                v-subheader.text-center(v-else)
                    .red--text No questions, click the button below to add some.
            
            v-btn(
                block
                dark
                color="green"
                @click="createNew()") Add a question

            v-divider.my-4

            .text-right
                v-btn.mr-2(
                    rounded
                    dark
                    color="green"
                    :disabled="!isValidQuestionnaire"
                    @click="save()") Save
                v-btn(
                    rounded
                    dark
                    color="red"
                    @click="cancel()") Cancel

        template(v-else)
            question-editor(
                :is-new="isNewQuestion"
                :reference="editingQuestion"
                @save="addQuestion"
                @cancel="hideEditor")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';

const questionEditor = () => import(/* webpackPrefetch: true */ /* webpackChunkName: "components" */ '@/components/QuestionEditor.vue');

import Questionnaire from '@/models/questionnaire';
import Question from '@/models/question';

@Component({
    components: {
        questionEditor,
        draggable,
    },
})
export default class QuestionnaireEditor extends Vue {

    @Prop({default: 0})
    public studyId!: number;

    @Prop({default: null})
    public reference!: Questionnaire;

    @Prop({default: false})
    public isNew!: boolean;

    questionnaire = new Questionnaire('');

    editingQuestion: Question | null = null;
    isNewQuestion = false;
    isEditingQuestion = false;

    nameRules = [
        (value: string) => !!value || 'Required.',
        (value: string) => (value && value.length >= 3) || 'Min 3 characters',
    ];

    get isValidQuestionnaire() {
        return this.questionnaire.isValid;
    }

    get isPublic() {
        return this.questionnaire.study === 0;
    }

    set isPublic( value: boolean ) {
        this.questionnaire.study = value ? 0 : this.studyId;
    }

    get isPublicOnly() {
        return this.studyId === 0;
    }

    createNew() {
        this.isNewQuestion = true;
        this.isEditingQuestion = true;
    }

    edit( question: Question ) {
        this.isNewQuestion = false;
        this.editingQuestion = question;
        this.isEditingQuestion = true;
    }

    clone( question: Question ) {
        this.isNewQuestion = true;
        this.editingQuestion = question;
        this.isEditingQuestion = true;
    }

    remove( question: Question ) {
        const index = this.questionnaire.items.findIndex( item => item === question );
        this.questionnaire.items.splice( index, 1 );
    }

    addQuestion( question: Question ) {
        if (this.isNewQuestion) {
            this.questionnaire.items.push( question );
        }
        else {
            const index = this.questionnaire.items.findIndex( q => q.id === question.id );
            if (index >= 0) {
                this.questionnaire.items[ index ] = question;
            }
        }

        this.hideEditor();
    }

    hideEditor() {
        this.isEditingQuestion = false;
        this.editingQuestion = null;
    }

    save() {
        if (!this.isNew && !!this.reference) {
            this.$store.commit( 'replaceQuestionnaire', this.questionnaire );
        }
        else {
            this.$store.commit( 'addQuestionnaire', this.questionnaire );
        }

        this.$store.dispatch( 'save' );

        this.$emit( 'save', this.questionnaire );
    }

    cancel() {
        this.$emit( 'cancel' );
    }

    created() {
        if (this.reference) {
            this.questionnaire.copyFrom( this.reference, !this.isNew );
        }
    }

    onSwapped( event: any ) {
        if (event.moved) {
            const items = this.questionnaire.items;
            const temp = items[ event.oldIndex ];
            items[ event.oldIndex ] = items[ event.newIndex ];
            items[ event.newIndex ] = temp;
        }
    }
}
</script>

<style>
.v-chip__content {
    width: 100%;
}

.v-chip__close {
    margin-left: auto !important;
}
</style>