export type JobOfferStatus =
    | 'pending'        // Oferta añadida pero aún no gestionada
    | 'submitted'      // Candidatura enviada
    | 'responded'      // Empresa ha respondido (cualquier tipo de respuesta)
    | 'ignored'        // Oferta descartada sin enviar nada
    | 'rejected'       // Empresa ha rechazado tu candidatura
    | 'interviewing'   // En proceso de entrevistas
    | 'offer-received' // Te han ofrecido el puesto
    | 'declined'       // Rechazaste la oferta de trabajo
    | 'accepted';      // Aceptaste la oferta

export class JobOfferStatusModel {
    constructor(
        public value: JobOfferStatus,
        public label: string,
        public icon: string
    ) { }

    static getAll(): JobOfferStatusModel[] {
        return [
            new JobOfferStatusModel('pending', 'Pendiente', 'hourglass_empty'),
            new JobOfferStatusModel('submitted', 'Enviada', 'send'),
            new JobOfferStatusModel('responded', 'Respondida', 'mark_email_read'),
            new JobOfferStatusModel('ignored', 'Ignorada', 'hide_source'),
            new JobOfferStatusModel('rejected', 'Rechazada', 'cancel'),
            new JobOfferStatusModel('interviewing', 'En entrevistas', 'record_voice_over'),
            new JobOfferStatusModel('offer-received', 'Oferta recibida', 'emoji_events'),
            new JobOfferStatusModel('declined', 'Rechazada por ti', 'thumb_down'),
            new JobOfferStatusModel('accepted', 'Aceptada', 'check_circle')
        ];
    }
}