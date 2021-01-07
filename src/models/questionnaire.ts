import Question from '@/models/question';

export default class Questionnaire {
    public static from( ref: Partial<Questionnaire> ) {
        const result = new Questionnaire( ref.name ?? '' );

        result.id = ref.id ?? result.id;
        result.items = ref.items ? ref.items.map( item => Question.from( item )) : result.items;
        result.study = ref.study ?? result.study;

        return result;
    }

    public id: number = 1000000 + Math.round( Math.random() * 8999999 );
    public name: string;
    public items: Question[] = [];
    public study: number = 0;

    constructor(name: string) {
        this.name = name;
    }

    public get isValid() {
        return this.items.length > 0 && this.name.length > 2;
    }

    public copyFrom(ref: Questionnaire) {
        this.id = ref.id ?? this.id;
        this.name = ref.name;
        ref.items.forEach( item => this.items.push( item ));
        this.study = this.study;
    }
}
