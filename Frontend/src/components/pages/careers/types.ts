export interface JobCandidateFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentLocation: string;
  totalExperience: string;
  currentSalary: string;
  expectedSalary: string;
  roleAppliedFor: string;
  currentCompany: string;
  resumeLink: string;
  whyShouldWeHireYou: string;
}

export const emptyJobCandidateFormData: JobCandidateFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  currentLocation: "",
  totalExperience: "",
  currentSalary: "",
  expectedSalary: "",
  roleAppliedFor: "",
  currentCompany: "",
  resumeLink: "",
  whyShouldWeHireYou: "",
};
