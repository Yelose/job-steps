export class JobScheduleModel {
    static readonly OPTIONS = [
        'Sin especificar',
        'Jornada completa',
        'Media jornada',
        'Turno de mañana',
        'Turno de tarde',
        'Turno de noche',
        'Flexible',
        'Por horas',
        'Fines de semana',
        'Remoto',
        'Presencial',
        'Híbrido'
    ] as const;

    static readonly VALUES = JobScheduleModel.OPTIONS
}

export type JobScheduleType = (typeof JobScheduleModel.OPTIONS)[number]