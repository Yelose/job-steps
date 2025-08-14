export type OfferFieldId =
  | 'title' | 'company' | 'location' | 'offerUrl' | 'companyUrl'
  | 'date' | 'submitted' | 'coverLetter' | 'description'
  | 'schedule' | 'contractType' | 'companySalary' | 'desiredSalary'
  | 'personalObjective' | 'status';

export interface OfferFormConfig {
  visible: Partial<Record<OfferFieldId, boolean>>;
  required: Partial<Record<OfferFieldId, boolean>>;
}
