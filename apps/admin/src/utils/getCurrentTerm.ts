import { CURRENT_SEMESTER, CURRENT_YEAR } from '@packages/constants';

const getCurrentTerm = () => {
  // const today = new Date();
  // const year = today.getFullYear();
  // const month = today.getMonth() + 1;

  // const semester = month >= 2 && month <= 7 ? 1 : 2;

  const year = CURRENT_YEAR;
  const semester = CURRENT_SEMESTER;

  return {
    year: year.toString(),
    semester: semester.toString(),
  };
};

export { getCurrentTerm };
