import Vue from 'vue';
import Vuex from 'vuex';

import Study from '@/models/study';
import Participant from '@/models/participant';
import Questionnaire from '@/models/questionnaire';

Vue.use(Vuex);

interface StorageData {
    isRunningStudy: boolean;
    studies: Study[];
    questionnaires: Questionnaire[];
}

interface StorageState extends StorageData {
    isConnected: boolean;
}

let url: string;

const store = new Vuex.Store({
    state: {
        isConnected: false,
        isRunningStudy: false,
        studies: [] as Study[],
        questionnaires: [] as Questionnaire[],
    } as StorageState,

    mutations: {
        setStudies( state, studies: Study[] ) {
            state.studies = [];
            studies.forEach( item => state.studies.push( Study.from( item ) ));
        },

        addStudy( state, study: Study ) {
            state.studies.push( study );
        },

        deleteStudy( state, study: Study ) {
            const index = state.studies.indexOf( study );
            state.studies.splice( index, 1 );
        },

        replaceStudy( state, study: Study ) {
            const index = state.studies.findIndex( item => item.id === study.id );
            if (index >= 0) {
                state.studies[ index ] = study;
            }
        },

        setQuestionnaires( state, questionnaires: Questionnaire[] ) {
            state.questionnaires = [];
            questionnaires.forEach( item => state.questionnaires.push( Questionnaire.from( item ) ));
        },

        addQuestionnaire( state, questionnaire: Questionnaire ) {
            state.questionnaires.push( questionnaire );
        },

        deleteQuestionnaire( state, questionnaire: Questionnaire ) {
            const index = state.questionnaires.indexOf( questionnaire );
            state.questionnaires.splice( index, 1 );
        },

        replaceQuestionnaire( state, questionnaire: Questionnaire ) {
            const index = state.questionnaires.findIndex( item => item.id === questionnaire.id );
            if (index >= 0) {
                state.questionnaires[ index ] = questionnaire;
            }
        },

        addParticipant( state, data: { participant: Participant, study: Study } ) {
            data.study.participants.push( data.participant );
        },

        setStudyStatus( state, isRunning: boolean ) {
            state.isRunningStudy = isRunning;
        },
    },

    actions: {
        connect({ commit, state }, _url: string ) {
            if (!state.isConnected) {
                url = _url;

                if (url === 'local') {
                    const storageData = localStorage.getItem( 'e-q' );
                    if (storageData) {
                        const data = JSON.parse( storageData ) as StorageData;
                        commit( 'setStudies', data.studies );
                        commit( 'setQuestionnaires', data.questionnaires );
                    }
                    state.isConnected = true;
                } else {
                    throw new Error('Storage: this URL is not supported');
                }
            }
        },
        save({ commit, state }) {
            if (url === 'local') {
                localStorage.setItem( 'e-q', JSON.stringify({
                    studies: state.studies,
                    questionnaires: state.questionnaires,
                }));
            }
        },
    },
});

export default store;
