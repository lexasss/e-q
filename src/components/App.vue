<template lang="pug">
    - var tip = "All data is stored locally in the browser (localStorage), therefore this app should not be loaded in 'private' mode. Also, do not clear the site data."
    v-app#app
        v-app-bar(
            v-show="!isRunningStudy"
            app
            color="primary"
            dark)

            div.d-flex.align-center
                v-img.shrink.mr-3(
                    alt="E-Q Logo"
                    contain
                    src="@/assets/logo.png"
                    transition="scale-transition"
                    width="40")
                v-toolbar-title E-Q

            v-spacer

            v-subheader offline questionnaire

            v-tooltip(left)
                template(v-slot:activator="{ on: tooltip }")
                    v-btn(
                        icon
                        @click="exportData()")
                        v-icon mdi-export
                span Export
            v-tooltip(left)
                template(v-slot:activator="{ on: tooltip }")
                    input(
                        ref="fileUpload"
                        type="file"
                        accept=".json" 
                        hidden
                        @change="importFile")
                    v-btn(
                        icon
                        @click="importData()")
                        v-icon mdi-import
                span Import

        v-main(:class="{ 'pa-0': isRunningStudy }")
            v-container(fluid)
                template(v-if="!selectedStudy")
                    studies(
                        ref="studies"
                        @update="update"
                        @study="selectStudy")
                    v-divider.mt-12
                    questionnaires(ref="questionnaires")
                study-viewer(
                    v-else
                    :study="selectedStudy"
                    @edit="editStudy"
                    @clone="cloneStudy"
                    @closed="hideStudyViewer()")

        v-footer.flex-column(
            v-show="!isRunningStudy"
            color="teal darken-1"
            padless
            dark)
            v-alert.full-width.ma-0(
                v-if="!isAlertHidden"
                dismissible
                type="warning"
                dense) #{tip}
            .py-2.blue-lighten-4--text(dark)
                .text-center {{ new Date().getFullYear() }} — Oleg Špakov, Tampere University
                .tip(v-if="isAlertHidden") #{tip}

        v-dialog(
            :value="isFileAlert"
            width="500")
            v-alert.ma-0(
                type="error"
                transition="scale-transition") Cannot load the file
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Studies from '@/components/Studies.vue';
import Questionnaires from '@/components/Questionnaires.vue';
import StudyViewer from '@/components/StudyViewer.vue';

import Study from '@/models/study';
import Questionnaire from '@/models/questionnaire';

import IO from '@/services/io';

@Component({
    components: {
        Studies,
        Questionnaires,
        'study-viewer': StudyViewer,
    },
})
export default class App extends Vue {

    selectedStudy: Study | null = null;
    isAlertHidden = false;
    isFileAlert = false;

    get isRunningStudy() {
        return this.$store.state.isRunningStudy;
    }

    selectStudy( study: Study ) {
        this.selectedStudy = study;
    }

    editStudy( study: Study ) {
        this.selectedStudy = null;
        this.$nextTick().then(() => {
            (this.$refs.studies as Studies).edit( study );
        });
    }

    cloneStudy( study: Study ) {
        this.selectedStudy = null;
        this.$nextTick().then(() => {
            (this.$refs.studies as Studies).clone( study );
        });
    }

    hideStudyViewer() {
        this.selectedStudy = null;
    }

    update() {
        this.$nextTick().then(() => {
            (this.$refs.questionnaires as Questionnaires).$forceUpdate();
        });
    }

    exportData() {
        const { studies, questionnaires } = this.$store.state;
        IO.download( JSON.stringify( { studies, questionnaires } ), 'e-q.json' );
    }

    importData() {
        const fileInputEl = this.$refs.fileUpload as HTMLInputElement;
        fileInputEl.click();
    }

    importFile( e: Event ) {
        const file = (e.target as HTMLInputElement).files?.item(0);
        if (file) {
            IO.read( file )
                .then( (data: any) => {
                    if (data.studies !== undefined && data.questionnaires !== undefined) {
                        this.$store.commit( 'setStudies', data.studies );
                        this.$store.commit( 'setQuestionnaires', data.questionnaires );
                        this.$store.dispatch( 'save' );
                    }
                    else {
                        throw new Error();
                    }
                })
                .catch(() => {
                    this.isFileAlert = true;
                });
        }
    }

    created() {
        this.$store.dispatch( 'connect', 'local' ).then(() => {
            if (this.$store.state.studies.length || this.$store.state.questionnaires.length) {
                this.isAlertHidden = true;
            }
        });
    }
}
</script>

<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.full-width {
    width: 100%;
}

.tip {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.75rem;
}
</style>
