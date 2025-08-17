import { JobContractType } from "./job-contract-type-model";
import { JobOfferStatus } from "./job-offer-status";
import { JobScheduleType } from "./job-schedule-model";
import { StageModel } from "./stage-model";

export interface JobOfferInterface {
  // siempre
  id: string;
  title: string;
  company: string;
  selectionStages: StageModel[];

  // ahora opcionales porque el form es configurable
  location?: string;
  offerUrl?: string;               // antes required
  companyUrl?: string;             // antes required
  date?: Date | null;              // antes required
  coverLetter?: string;
  submitted?: boolean;             // antes required
  description?: string;
  schedule?: JobScheduleType | null;
  contractType?: JobContractType | null;
  companySalary?: string;
  desiredSalary?: string;
  personalObjective?: string;
  status?: JobOfferStatus;         // antes required
}
