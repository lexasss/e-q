import Participant, { ParticipantQuestionnaire } from './participant';
import Question from './question';
import Study from './study';

class ResultQuestion {
    public name: string;
    public answer: string;

    constructor( question: Question ) {
        this.name = question.name;

        if (question.value === undefined || null) {
            this.answer = '';
        }
        else if (Array.isArray( question.value )) {
            this.answer = question.value.join( ',' );
        }
        else {
            this.answer = `${question.value}`;
        }
    }
}

class ResultQuestionnaire {
    public name: string;
    public questions: ResultQuestion[];

    constructor( questionnaire: ParticipantQuestionnaire ) {
        this.name = questionnaire.name;
        this.questions = questionnaire.answers.map( qa => new ResultQuestion( qa ) );
    }
}

class ParticipantResult {
    public name: string;
    public questionnaires: ResultQuestionnaire[];

    constructor( participant: Participant ) {
        this.name = participant.name;
        this.questionnaires = participant.questionnaires.map( quest => new ResultQuestionnaire( quest ) );
    }
}

export default class StudyResults {
    private name: string;
    private participants: ParticipantResult[];

    constructor( study: Study ) {
        this.name = study.name;
        this.participants = study.participants.map( p => new ParticipantResult( p ) );
    }

    public asCSV( sep: string ) {
        if (this.participants.length === 0) {
            return '';
        }

        const header1 = [
            '',
            ...this.participants[0].questionnaires.map( quest => [
                quest.name,
                ...(new Array( quest.questions.length - 1)).map( _ => '' ),
            ].join( sep )),
        ].join( sep );

        const header2 = [
            'name',
            ...this.participants[0].questionnaires.map( quest =>
                quest.questions.map( q => q.name ).join( sep ),
            ),
        ].join( sep );

        return [
            header1,
            header2,
            ...this.participants.map( p => [
                p.name,
                ...p.questionnaires.map( quest =>
                    quest.questions.map( q =>
                        q.answer,
                    ).join( sep ),
                ),
            ].join( sep )),
        ].join( '\r\n' );
    }
}

