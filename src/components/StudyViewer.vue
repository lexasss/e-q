<template lang="pug">
    .study-viewer
        .text-h4.my-4 {{ header }}

        template(v-if="!isRunning")
            v-container
                v-row
                    v-col(md="2").text-subtitle-1.font-weight-bold.text-right Description:
                    v-col.text-left {{ study.description }}
                v-row
                    v-col(md="2").text-subtitle-1.font-weight-bold.text-right Questionnaires:
                    v-col.text-left {{ questList }}
                v-row
                    v-col(md="2").text-subtitle-1.font-weight-bold.text-right Participants:
                    v-col.text-left {{ study.participants.length }}
                v-row
                    v-col(md="2").text-subtitle-1.font-weight-bold.text-right
                    v-col
                        .d-flex.justify-space-between
                            v-btn.mr-2(
                                color="primary"
                                @click="askName") Run
                            v-btn.mr-2(
                                color="primary"
                                @click="clone") Clone
                            v-btn.mr-2(
                                color="primary"
                                @click="save") Save to file
                            v-spacer
                            v-btn.mr-2(
                                dark
                                color="red"
                                @click="del") Delete
                            v-spacer
                            v-btn.mr-2(
                                color="secondary"
                                @click="close") Return

        study-runner(
            v-else
            :participant-name="participantName"
            :study="study"
            @finished="finished")

        v-dialog(
            v-model="isAskingName"
            persistent
            max-width="500px")
            v-card
                v-card-title New participant
                v-card-text
                    v-text-field(
                        v-model="participantName"
                        label="Name"
                        ref="participantName"
                        :rules="nameRules")
                v-card-actions
                    v-spacer
                    v-btn.mr-2.px-4(
                        rounded
                        dark
                        color="green"
                        :disabled="!isValidName"
                        @click="run()") Start
                    v-btn.px-4(
                        rounded
                        dark
                        color="red"
                        @click="cancel()") Cancel
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import StudyRunner from '@/components/StudyRunner.vue';

import Study from '@/models/study';
import Participant from '@/models/participant';
import Questionnaire from '@/models/questionnaire';

import IO from '@/services/io';
import store from '@/services/storage';

@Component({
    components: {
        'study-runner': StudyRunner,
    },
})
export default class StudyViewer extends Vue {

    @Prop({default: null})
    public study!: Study;

    isRunning = false;
    isAskingName = false;
    isShowingDeleteWarning = false;
    participantName = '';

    nameRules = [
        (value: string) => !!value || 'Required.',
        (value: string) => (value && value.length >= 2) || 'Min 2 characters',
    ];

    get header() {
        return this.study.name + (this.participantName ? ' // ' + this.participantName : '');
    }

    get questList() {
        return this.study.questionnaires.map( id => {
            const questionnaire = this.$store.state.questionnaires.find( (item: Questionnaire) => {
                return item.id === id;
            }) as Questionnaire;
            return questionnaire?.name ?? '--';
        }).join(', ');
    }

    get isValidName() {
        return this.participantName.length > 1;
    }

    askName() {
        this.participantName = 'p' + (this.study.participants.length + 1);
        this.isAskingName = true;

        this.$nextTick(() => {
            (this.$refs.participantName as HTMLElement).focus();
        });
    }

    run() {
        if (this.participantName) {
            this.$store.commit( 'setStudyStatus', true );
            this.isAskingName = false;
            this.isRunning = true;
        }
    }

    cancel() {
        this.isAskingName = false;
        this.participantName = '';
    }

    clone() {
        this.$emit( 'clone', this.study );
    }

    save() {
        IO.download( this.study.asCSV(), `${this.study.name}.csv` );
    }

    del() {
        if (window.confirm( 'Are you sure to delete this study?' )) {
            this.$store.commit( 'deleteStudy', this.study );
            this.$store.dispatch( 'save' );
            this.close();
        }
    }

    close() {
        this.$emit( 'closed' );
    }

    finished( participant: Participant ) {
        this.$store.commit( 'setStudyStatus', false );

        if (participant) {
            this.$store.commit( 'addParticipant', {
                participant,
                study: this.study,
            });
            this.$store.dispatch( 'save' );
        }

        this.isRunning = false;
        this.participantName = '';
    }
}
</script>
