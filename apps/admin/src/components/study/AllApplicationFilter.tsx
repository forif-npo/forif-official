import Stack from '@mui/system/Stack';

import { Select } from '@packages/components/Select';
import { Semester } from '@packages/components/types/semester';
import { SEMESTER_OPTIONS, YEAR_OPTIONS } from '@packages/constants';
import { useNavigate } from '@tanstack/react-router';

export function AllApplicationFilter({ year, semester }: Semester) {
  const navigate = useNavigate({ from: '/studies/applications' });
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems={'flex-start'}
      gap={2}
      flexWrap={'wrap'}
      width={'100%'}
      mb={2}
    >
      <Select
        val={year.toString()}
        setVal={(value) => {
          navigate({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            search: (prev: any) => ({ ...prev, year: Number(value) }),
          });
        }}
        placeholder='스터디 진행 연도'
        options={YEAR_OPTIONS}
        minWidth={120}
        sx={{
          backgroundColor: 'background.default',
        }}
      />
      <Select
        val={semester.toString()}
        setVal={(value) => {
          navigate({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            search: (prev: any) => ({ ...prev, semester: Number(value) }),
          });
        }}
        placeholder='스터디 진행 학기'
        options={SEMESTER_OPTIONS}
        minWidth={120}
        sx={{
          backgroundColor: 'background.default',
        }}
      />
    </Stack>
  );
}
