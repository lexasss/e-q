import StudyResults from '@/models/results';
import Participant from '@/models/participant';
import { QuestionType } from '@/models/question';

export default class Study {
    public static from( ref: Partial<Study>, isCloning = false ) {
        const result = new Study();

        if (!isCloning) {
            result.id = ref.id ?? result.id;
        }

        result.name = ref.name ?? result.name;
        result.description = ref.description ?? result.description;
        result.questionnaires = ref.questionnaires
            ? ref.questionnaires.map( item => item )
            : result.questionnaires;

        if (!isCloning) {
            result.participants = ref.participants
                ? ref.participants.map( item => Participant.from( item ) )
                : result.participants;
        }

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

    public asCSV( sep = '\t' ): string {

        return (new StudyResults( this )).asCSV( sep );
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
