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
                //- v-toolbar-title E-Q

            v-subheader Electronic offline questionnaire

            v-spacer

            template(v-if="user")
                v-subheader {{ user.name }}
            v-btn(
                v-else
                icon
                @click="signIn()")
                v-icon mdi-login

            //- v-tooltip(left)
            //-     template(v-slot:activator="{ on: tooltip }")
            //-         input(
            //-             ref="fileUpload"
            //-             type="file"
            //-             accept=".json" 
            //-             hidden
            //-             @change="importFile")
            //-         v-btn(
            //-             icon
            //-             @click="importData()")
            //-             v-icon mdi-import
            //-     span Import


            v-menu(left)
                template(v-slot:activator="{ on, attrs }")
                    v-btn(dark icon v-bind="attrs" v-on="on")
                        v-icon mdi-dots-vertical

                v-list
                    v-list-item(@click="exportData()")
                        v-list-item-icon
                            v-icon mdi-export
                        v-list-item-title Export data
                    v-list-item(@click="importData()")
                        v-list-item-icon
                            v-icon mdi-import
                        v-list-item-title Import data
                        input(
                            ref="fileUpload"
                            type="file"
                            accept=".json" 
                            hidden
                            @change="importFile")

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
                v-if="isAppWarningVisible"
                dismissible
                type="warning"
                dense) #{tip}
            .py-2.blue-lighten-4--text(dark)
                .text-center {{ new Date().getFullYear() }} — Oleg Špakov, Tampere University, v{{ VERSION }}
                .tip(v-if="!isAppWarningVisible") #{tip}

        v-dialog(
            v-model="isAlertVisible"
            width="500")
            v-alert.ma-0(
                type="error"
                transition="scale-transition") {{ alertMessage }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Studies from '@/components/Studies.vue';
import Questionnaires from '@/components/Questionnaires.vue';

const studyViewer = () => import(/* webpackPrefetch: true */ /* webpackChunkName: "components" */ '@/components/StudyViewer.vue');

import Study from '@/models/study';
import Questionnaire from '@/models/questionnaire';

import IO from '@/services/io';
import OAuth from '@/services/auth';

@Component({
    components: {
        Studies,
        Questionnaires,
        studyViewer,
    },
})
export default class App extends Vue {

    readonly VERSION = process.env.PACKAGE_VERSION;

    selectedStudy: Study | null = null;
    isAppWarningVisible = true;

    isAlertVisible = false;
    alertMessage = '';

    get isRunningStudy() {
        return this.$store.state.isRunningStudy;
    }

    get user() {
        return this.$store.state.user;
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
        if (studies.length > 0 || questionnaires.length > 0) {
            IO.download( JSON.stringify( { studies, questionnaires } ), 'e-q.json' );
        }
        else {
            this.alertMessage = 'No data to save';
            this.isAlertVisible = true;
        }
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
                    this.alertMessage = 'Cannot load the file';
                    this.isAlertVisible = true;
                });
        }
    }

    signIn() {
        OAuth.signIn();
    }

    async created() {
        // connect to the local storage
        this.$store.dispatch( 'connect', 'local' ).then(() => {
            if (this.$store.state.studies.length || this.$store.state.questionnaires.length) {
                this.isAppWarningVisible = false;
            }
        });

        // This is probably never used
        navigator.storage.persisted().then( granted => {
            if (granted) {
                this.isAppWarningVisible = false;
            }
            else {
                return navigator.storage.persisted();
            }
        }).then( granted => {
            if (granted) {
                this.isAppWarningVisible = false;
            }
        });

        // Handle Google server response, if any
        try {
            const profile = await OAuth.load();
            if (profile) {
                this.$store.commit( 'setUser', profile );
                this.$store.dispatch( 'save' );
            }
        }
        catch (error) {
            console.log( error );
        }
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
