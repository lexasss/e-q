<template lang="pug">
    .questionnaires
        h2.subtitle.is-4 Questionnaires

        .list(v-if="!!$store.state.questionnaires.length")
            .field(v-for="quest in $store.state.questionnaires")
                .control.questionnaire
                    .name {{ quest.name }}
                    .study(:class="{ 'is-not-used': isNotUsed(quest) }") [{{ studies(quest) }}]
                    button.button.is-danger(v-if="isNotUsed(quest)" @click="del(quest)") x
        .info(v-else) No questionnaires
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Questionnaire from '@/models/questionnaire';
import Study from '@/models/study';

@Component({
    components: {
    },
})
export default class Questionnaires extends Vue {
    studies( quest: Questionnaire ) {
        if (quest.study === 0) {
            return 'public';
        }
        else {
            const study = this.$store.state.studies.find( (item: Study) => item.id === quest.study );
            return study ? study.name : 'not used';
        }
    }

    isNotUsed( quest: Questionnaire ) {
        if (quest.study === 0) {
            return !this.$store.state.studies.some( (item: Study) => {
                return item.questionnaires.some( q => q.id === quest.id );
            });
        }
        else {
            return !this.$store.state.studies.find( (item: Study) => item.id === quest.study );
        }
    }

    del( quest: Questionnaire ) {
        let isAllowed = true;
        if (quest.study === 0) {
            isAllowed = window.confirm( 'Are you sure to delete this questionnaire?' );
        }

        if (isAllowed) {
            this.$store.commit( 'deleteQuestionnaire', quest );
            this.$store.dispatch( 'save' );
        }
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
.list {
    margin: 1em;
}

.info {
    font-style: italic;
    font-size: 0.75em;
    line-height: 2.5rem;
}

.questionnaire {
    display: inline-flex;
    line-height: 2.5rem;
}

.name {
    padding: 0 0.5em;
}

.study {
    font-style: italic;
    margin: 0 0.5em;
}

.is-not-used {
    color: red;
}
</style>
