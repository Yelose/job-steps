import { JobContractType } from "./job-contract-type-model";
import { JobScheduleType } from "./job-schedule-model";
import { StageModel } from "./stage-model";

export interface JobOfferInterface {
    id: string;
    title: string;
    company: string;
    location?: string;
    offerUrl: string;
    companyUrl: string;
    date: Date;
    coverLetter?: string;
    submitted: boolean;
    description?: string;
    schedule?: JobScheduleType;
    contractType?: JobContractType;
    salary?: string;
    selectionStages: StageModel[];
    personalObjective?: string;
}
