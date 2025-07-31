import { JobOfferInterface } from './job-offer-interface';
import { StageModel } from './stage-model';
import { JobContractType } from './job-contract-type-model';
import { JobOfferStatus } from './job-offer-status';
import { JobScheduleType } from './job-schedule-model';

export class JobOfferDisplayModel implements JobOfferInterface {
    id!: string;
    title!: string;
    company!: string;
    offerUrl!: string;
    companyUrl!: string;
    date!: Date;
    submitted!: boolean;
    selectionStages!: StageModel[];
    status!: JobOfferStatus;

    location?: string;
    coverLetter?: string;
    description?: string;
    schedule?: JobScheduleType;
    contractType?: JobContractType;
    companySalary?: string;
    desiredSalary?: string;
    personalObjective?: string;

    // Campos derivados
    formattedCoverLetter: string[];
    formattedObjective: string[];
    formattedOfferDescription: string[];

    constructor(
        base: JobOfferInterface,
        toLineArray: (text: string) => string[]
    ) {
        Object.assign(this, base);
        this.formattedCoverLetter = toLineArray(base.coverLetter ?? '');
        this.formattedObjective = toLineArray(base.personalObjective ?? '');
        this.formattedOfferDescription = toLineArray(base.description ?? '');
    }
}
