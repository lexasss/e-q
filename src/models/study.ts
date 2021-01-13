import Questionnaire from '@/models/questionnaire';
import Participant from '@/models/participant';
import { QuestionType } from '@/models/question';

export default class Study {
    public static from(ref: Partial<Study>) {
        const result = new Study();

        result.id = ref.id ?? result.id;
        result.name = ref.name ?? result.name;
        result.description = ref.description ?? result.description;
        result.questionnaires = ref.questionnaires
            ? ref.questionnaires.map( item => item )
            : result.questionnaires;
        result.participants = ref.participants
            ? ref.participants.map( item => Participant.from( item ) )
            : result.participants;

        return result;
    }

    public id = 300000000 + Math.round( Math.random() * 99999999 );
    public name = '';
    public description = '';
    public questionnaires: number[] = [];
    public participants: Participant[] = [];

    public get isValid() {
        return this.questionnaires.length > 0 &&
            this.name.length > 0;
    }

    public get collectedData(): any {
        return this.participants.map( p => { return {
            name: p.name,
            results: p.questionnaires.map( quest => { return {
                questionnaire: quest.id,
                name: quest.name,
                answers: quest.answers.map( q => { return {
                    question: q.id,
                    text: q.name,
                    answer: q.value,
                }; }),
            }; }),
        }; });
    }

    private defaultValue( type: QuestionType ) {
        if (type === QuestionType.ChoiceMultiple) {
            return [];
        }
        else if (type === QuestionType.Number || type === QuestionType.Scale) {
            return Number.MIN_SAFE_INTEGER;
        }
        else {
            return '';
        }
    }
}
