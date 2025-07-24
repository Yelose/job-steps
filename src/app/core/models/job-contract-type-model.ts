export class JobContractTypeModel {
    static readonly OPTIONS = [
        'Sin especificar',
        'Indefinido',
        'Temporal',
        'Por obra y servicio',
        'Prácticas',
        'Beca',
        'Freelance',
        'Autónomo',
        'Interinidad',
        'Relevo',
        'Formativo',
        'Fijo discontinuo'
    ] as const;

    static readonly VALUES = JobContractTypeModel.OPTIONS
}

export type JobContractType = (typeof JobContractTypeModel.OPTIONS)[number]
