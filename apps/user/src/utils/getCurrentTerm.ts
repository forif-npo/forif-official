import { CURRENT_SEMESTER, CURRENT_YEAR } from '@packages/constants';

export interface Semester {
  year: number;
  semester: number;
}

const getCurrentTerm = () => {
  const year = CURRENT_YEAR;
  const semester = CURRENT_SEMESTER;

  return {
    year: year.toString(),
    semester: semester.toString(),
  };
};

export { getCurrentTerm };
