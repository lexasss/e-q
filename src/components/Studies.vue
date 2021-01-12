<template lang="pug">
    .studies
        template(v-if="!study")
            h2.subtitle.is-4 Studies
            .list(v-if="!!$store.state.studies.length")
                .item(v-for="study in $store.state.studies")
                    button.button.study-item(@click="show(study)") {{ study.name }}
            .no-items(v-else) No studies

            button.button.is-success(@click="createNew()") Create new

            .questionnaires
                questionnaires

            .modal(:class="{ 'is-active': !!editedStudy }")
                .modal-background
                .modal-content(v-if="!!editedStudy")
                    study-editor(:study="editedStudy" @save="save" @cancel="cancel")

        study-viewer(v-else :study="study" @closed="hide()")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import { mapActions } from 'vuex';

import Questionnaires from '@/components/Questionnaires.vue';
import StudyEditor from '@/components/StudyEditor.vue';
import StudyViewer from '@/components/StudyViewer.vue';

import Study from '@/models/study';

@Component({
    components: {
        Questionnaires,
        'study-editor': StudyEditor,
        'study-viewer': StudyViewer,
    },
    // methods: {
    //    ...mapActions(['addTodo'])
    // },
})
export default class Studies extends Vue {
    public editedStudy: Study | null = null;
    public study: Study | null = null;

    createNew() {
        this.editedStudy = new Study();
    }

    save(study: Study) {
        this.editedStudy = null;
        this.$store.commit('addStudy', study);
        this.$store.dispatch('save');
    }

    cancel() {
        this.editedStudy = null;
    }

    show(study: Study) {
        this.study = study;
    }

    hide() {
        this.study = null;
    }
}
</script>

<style scoped lang="less">
.list {
    margin: 1em;
}

.study-item {
    width: 100%;
}

.no-items {
    font-style: italic;
    font-size: 0.75em;
    line-height: 2.5rem;
}

.questionnaires {
    margin-top: 4em;
}
</style>
