<template lang="pug">
    .study-viewer
        h2.subtitle.is-4 {{ header }}

        template(v-if="!isRunning")
            .field.is-horizontal
                .field-label
                    .label.label Description:
                .field-body
                    .field
                        .control.is-expanded
                            .has-text-left {{ study.description }}
            .field.is-horizontal
                .field-label
                    .label.label Questionnaires:
                .field-body
                    .field
                        .control.is-expanded
                            .has-text-left {{ questList }}
            .field.is-horizontal
                .field-label
                    .label.label Participants:
                .field-body
                    .field
                        .control.is-expanded
                            .has-text-left {{ study.participants.length }}
            .field.is-horizontal
                .field-label
                    .label.label
                .field-body
                    .field.is-grouped
                        .control
                            button.button.is-info(@click="askName") Run
                        .control
                            button.button.is-info(@click="save") Save to file
                        .control
                            button.button.is-danger(@click="del") Delete
                        .control
                            button.button.is-warning(@click="close") Return

        study-runner(v-else :participant-name="participantName" :study="study" @finished="finished")

        .modal(:class="{ 'is-active': isAskingName }")
            .modal-background
            .modal-content.is-clipped
                .new-participant(@keyup.escape="cancel()" @keyup.enter="run()")
                    h4.is-4 New participant
                    .field
                        .control
                            input.input(v-model="participantName" ref="participantName")
                    .buttons.is-right
                        button.button.is-rounded.is-success(:disabled="!isValidName" @click="run()") Start
                        button.button.is-rounded.is-danger(@click="cancel()") Cancel
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

    public isRunning = false;
    public isAskingName = false;
    public isShowingDeleteWarning = false;
    public participantName = '';

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

    save() {
        IO.download( JSON.stringify( this.study.collectedData ), `${this.study.name}.json` );
    }

    del() {
        if (window.confirm( 'Are you sure to delete this study?' )) {
            this.$store.commit( 'deleteStudy', this.study );
            this.$store.dispatch( 'save' );
            this.close();
        }
    }

    close() {
        this.$emit('closed');
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

    created() {
        // ok
    }

    mounted() {
        // ok
    }
}
</script>

<style scoped lang="less">
.new-participant {
    background-color: white;
    padding: 1em;
}
</style>
