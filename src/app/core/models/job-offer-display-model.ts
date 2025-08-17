import { JobOfferInterface } from './job-offer-interface';
import { StageModel } from './stage-model';
import { JobContractType } from './job-contract-type-model';
import { JobOfferStatus } from './job-offer-status';
import { JobScheduleType } from './job-schedule-model';

export class JobOfferDisplayModel implements JobOfferInterface {
  id!: string;
  title!: string;
  company!: string;
  selectionStages!: StageModel[];

  // ahora con defaults seguros
  offerUrl?: string;
  companyUrl?: string;
  date?: Date | null = null;
  submitted?: boolean = false;
  status?: JobOfferStatus = 'pending';

  location?: string;
  coverLetter?: string;
  description?: string;
  schedule?: JobScheduleType | null;
  contractType?: JobContractType | null;
  companySalary?: string;
  desiredSalary?: string;
  personalObjective?: string;

  // derivados para tu vista
  formattedCoverLetter: string[];
  formattedObjective: string[];
  formattedOfferDescription: string[];

  constructor(base: JobOfferInterface, toLineArray: (text: string) => string[]) {
    Object.assign(this, base);
    this.formattedCoverLetter = toLineArray(base.coverLetter ?? '');
    this.formattedObjective = toLineArray(base.personalObjective ?? '');
    this.formattedOfferDescription = toLineArray(base.description ?? '');
  }
}
