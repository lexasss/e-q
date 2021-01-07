import Questionnaire from '@/models/questionnaire';
import Study from '@/models/study';

export default class Participant {
    public static from( ref: Partial<Participant> ) {
        const result = new Participant( ref.name ?? '--undefined--' );

        result.questionnaires = ref.questionnaires
            ? ref.questionnaires.map( item => Questionnaire.from( item ) )
            : result.questionnaires;

        return result;
    }

    public id = 400000000 + Math.round( Math.random() * 99999999 );
    public name: string;
    public questionnaires: Questionnaire[] = [];

    constructor( name: string, study?: Study ) {
        this.name = name;

        if (study) {
            this.questionnaires = study.questionnaires.map( item => Questionnaire.from( item ) );
        }
    }
}
