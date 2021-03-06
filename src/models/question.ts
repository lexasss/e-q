export const enum QuestionType {
    None,
    Text,
    Number,
    ChoiceOne,
    ChoiceMultiple,
    Scale,
}

interface IQuestionText {
    maxLength: number;
}

interface IQuestionNumber {
    min: number;
    max: number;
}

interface IQuestionChoice {
    isMultiple: boolean;
    asDropdownList: boolean;
    items: string[];
}

interface IQuestionScale {
    min: number;
    max: number;

    labelLeft: string;
    labelCenter: string;
    labelRight: string;

    hasSlider: boolean;
}

export type QuestionAny = QuestionText | QuestionNumber | QuestionChoice | QuestionScale;
export type QuestionParams = IQuestionText & IQuestionNumber & IQuestionChoice & IQuestionScale;

export type QuestionValueType = number | string | string[] | null;

export default class Question {
    public static from( ref: Partial<Question> ): QuestionAny {
        const type = ref.type ?? QuestionType.None;
        if ( type === QuestionType.Text) {
            return new QuestionText( ref );
        }
        else if ( type === QuestionType.Number) {
            return new QuestionNumber( ref );
        }
        else if ( type === QuestionType.ChoiceOne) {
            return new QuestionChoice( ref );
        }
        else if ( type === QuestionType.ChoiceMultiple) {
            return new QuestionChoice( ref );
        }
        else if ( type === QuestionType.Scale) {
            return new QuestionScale( ref );
        }
        else {
            throw new Error('Question: unknown type');
        }
    }

    public id = 100000000 + Math.round( Math.random() * 99999999 );
    public name = '';
    public isRequired = true;
    public type = QuestionType.None;

    public value: QuestionValueType = null;

    constructor( ref: Partial<Question> ) {
        this.id = ref.id ?? this.id;
        this.name = ref.name ?? this.name;
        this.isRequired = ref.isRequired ?? this.isRequired;
        this.type = ref.type ?? this.type;

        if (this.type === QuestionType.ChoiceMultiple) {
            this.value = [];
        }

        this.value = ref.value ?? this.value;
    }

    public get isAnswered(): boolean {
        return this.value !== null && this.value !== '' && this.value !== Number.MIN_SAFE_INTEGER;
    }

    get isValid() {
        return this.name.length > 0 && this.type !== QuestionType.None;
    }
}

export  class QuestionText extends Question implements IQuestionText {
    public maxLength = 100;

    constructor( ref: Partial<QuestionText> ) {
        super( ref );

        this.maxLength = ref.maxLength ?? this.maxLength;
    }
}

export class QuestionNumber extends Question implements IQuestionNumber {
    public min = Number.MIN_SAFE_INTEGER;
    public max = Number.MAX_SAFE_INTEGER;

    constructor( ref: Partial<QuestionNumber> ) {
        super( ref );

        this.min = ref.min ?? this.min;
        this.max = ref.max ?? this.max;
    }
}

export class QuestionChoice extends Question implements IQuestionChoice {
    public isMultiple = false;
    public asDropdownList = false;
    public items: string[] = [];

    constructor( ref: Partial<QuestionChoice> ) {
        super( ref );

        this.isMultiple = ref.isMultiple ?? this.isMultiple;
        this.asDropdownList = ref.asDropdownList ?? this.asDropdownList;
        this.items = ref.items ?? this.items;
    }
}

export class QuestionScale extends Question implements IQuestionScale {
    public min = 1;
    public max = 5;

    public labelLeft = '';
    public labelCenter = '';
    public labelRight = '';

    public hasSlider = false;

    constructor( ref: Partial<QuestionScale> ) {
        super( ref );

        this.min = ref.min ?? this.min;
        this.max = ref.max ?? this.max;

        this.labelLeft = ref.labelLeft ?? this.labelLeft;
        this.labelCenter = ref.labelCenter ?? this.labelCenter;
        this.labelRight = ref.labelRight ?? this.labelRight;

        this.hasSlider = ref.hasSlider ?? this.hasSlider;
    }
}
