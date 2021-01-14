import Question from '@/models/question';
import Questionnaire from './questionnaire';

export class ParticipantQuestionnaire {
    public static from( ref: ParticipantQuestionnaire ) {
        const result = new ParticipantQuestionnaire( ref.id, ref.name );
        result.answers = ref.answers
            ? ref.answers.map( item => Question.from( item ) )
            : result.answers;
        return result;
    }

    public id: number;
    public name: string;
    public answers: Question[] = [];

    constructor( id: number, name?: string, questions?: Question[] ) {
        this.id = id;
        this.name = name ?? '';
        this.answers = questions?.map( item => Question.from( item ) ) ?? this.answers;
    }
}

export default class Participant {
    public static from( ref: Partial<Participant> ) {
        const result = new Participant( ref.name ?? '--undefined--' );

        result.questionnaires = ref.questionnaires
            ? ref.questionnaires.map( item => ParticipantQuestionnaire.from( item ) )
            : result.questionnaires;

        return result;
    }

    public id = 400000000 + Math.round( Math.random() * 99999999 );
    public name: string;
    public questionnaires: ParticipantQuestionnaire[] = [];

    constructor( name: string, questionnaires?: Questionnaire[] ) {
        this.name = name;

        if (questionnaires) {
            this.questionnaires = questionnaires.map( item => {
                return new ParticipantQuestionnaire( item.id, item.name, item.items );
            });
        }
    }
}
