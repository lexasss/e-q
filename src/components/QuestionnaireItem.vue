<template lang="pug">
    .questionnaire-item.field
        .control
            button.button.is-danger(@click="remove()") x
            .name(:class="{ 'is-private': !!questionnaire.study }") {{ questionnaire.name }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Questionnaire from '@/models/questionnaire';

@Component({
  components: {
  },
})
export default class QuestionnaireItem extends Vue {
    @Prop({default: 0})
    public questionnaireId!: number;

    public questionnaire: Questionnaire | null = null;

    remove(questionnaire: Questionnaire) {
        this.$emit('remove');
    }

    created() {
        this.questionnaire = this.$store.state.questionnaires.find( (item: Questionnaire) => {
            return item.id === this.questionnaireId;
        });
    }
}
</script>

<style scoped lang="less">
.name {
    display: inline-flex;
    line-height: 2.5em;
    vertical-align: middle;
    margin: 0 0.5em;
}

.is-private {
    font-style: italic;
}
</style>
