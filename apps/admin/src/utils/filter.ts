import { AllApplication } from '@services/admin.service';

export const isUserPassed = (
  application: AllApplication,
  name: string | undefined,
) => {
  return (
    (application.primary_study_name === name &&
      application.primary_status === 1) ||
    (application.secondary_study_name === name &&
      application.primary_status === 0 &&
      application.secondary_status === 1)
  );
};

export const onlyRegularApplications = (application: AllApplication) => {
  return (
    (application.primary_study_name !== '자율스터디' &&
      application.primary_status === 1) ||
    (application.secondary_study_name !== '자율스터디' &&
      application.primary_status === 0 &&
      application.secondary_status === 1)
  );
};

export const onlyAutoApplications = (application: AllApplication) => {
  return (
    (application.primary_study_name === '자율스터디' &&
      application.primary_status === 1) ||
    (application.secondary_study_name === '자율스터디' &&
      application.primary_status === 0 &&
      application.secondary_status === 1)
  );
};

export const onlyFailApplications = (application: AllApplication) => {
  return (
    (application.primary_status === 0 && !application.secondary_study_name) ||
    (application.primary_status === 0 && application.secondary_status === 0)
  );
};
