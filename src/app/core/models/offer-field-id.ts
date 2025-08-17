export type OfferFieldId =
  | 'title' | 'company' | 'location' | 'offerUrl' | 'companyUrl'
  | 'date' | 'submitted' | 'coverLetter' | 'description'
  | 'schedule' | 'contractType' | 'companySalary' | 'desiredSalary'
  | 'personalObjective' | 'status';

export const ALL_FIELDS: readonly OfferFieldId[] = [
  'title', 'company', 'location', 'offerUrl', 'companyUrl',
  'date', 'submitted', 'coverLetter', 'description',
  'schedule', 'contractType', 'companySalary', 'desiredSalary',
  'personalObjective', 'status',
] as const;

export interface OfferFormConfig {
  visible: Record<OfferFieldId, boolean>;
  required: Partial<Record<OfferFieldId, boolean>>;
}

export function allTrue(): Record<OfferFieldId, boolean> {
  return ALL_FIELDS.reduce((acc, k) => (acc[k] = true, acc), {} as Record<OfferFieldId, boolean>);
}

export const DEFAULT_OFFER_FORM_CONFIG: OfferFormConfig = {
  visible: allTrue(),
  required: { title: true, company: true, offerUrl: true, companyUrl: true },
};
