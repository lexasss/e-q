import Question from '@/models/question';

export default class Questionnaire {
    public static from( ref: Partial<Questionnaire>, isCloning = false ) {
        const result = new Questionnaire( ref.name ?? '' );

        if (!isCloning) {
            result.id = ref.id ?? result.id;
        }
        result.description = ref.description ?? result.description;
        result.items = ref.items ? ref.items.map( item => Question.from( item )) : result.items;
        result.study = ref.study ?? result.study;

        return result;
    }

    public id = 200000000 + Math.round( Math.random() * 99999999 );
    public name: string;
    public description = '';
    public items: Question[] = [];
    public study = 0;

    constructor( name: string ) {
        this.name = name;
    }

    public get isValid() {
        return this.items.length > 0 && this.name.length > 2;
    }

    public copyFrom( ref: Questionnaire, copyID = true ) {
        if (copyID) {
            this.id = ref.id ?? this.id;
        }

        this.name = ref.name;
        this.description = ref.description;
        ref.items.forEach( item => this.items.push( item ));

        if (copyID) {
            this.study = this.study;
        }
    }
}
