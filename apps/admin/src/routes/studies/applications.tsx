import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { Table } from '@packages/components/table/Table';
import { Semester } from '@packages/components/types/semester';
import { CURRENT_SEMESTER, CURRENT_YEAR } from '@packages/constants';
import { Application, getAllApplications } from '@services/admin.service';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';

import { Layout } from '@components/common/Layout';
import { Title } from '@components/common/Title';
import { AllApplicationFilter } from '@components/study/AllApplicationFilter';

export const Route = createFileRoute('/studies/applications')({
  validateSearch: (search: Record<string, unknown>): Semester => {
    return {
      year: Number(search?.year ?? CURRENT_YEAR),
      semester: Number(search?.semester ?? CURRENT_SEMESTER),
    };
  },
  component: ApplicationsPage,
});

const columns: GridColDef<Application>[] = [
  { field: 'user_id', headerName: '학번', flex: 2 },
  { field: 'name', headerName: '이름', flex: 1 },
  { field: 'department', headerName: '학과', flex: 2 },
  { field: 'primary_study_name', headerName: '1순위 스터디', flex: 2 },
  { field: 'secondary_study_name', headerName: '2순위 스터디', flex: 2 },
  { field: 'phone_number', headerName: '전화번호', flex: 2 },
  {
    field: 'apply_date',
    headerName: '최종 제출 일자',
    flex: 2,
    valueFormatter: (params) => dayjs(params).format('YYYY-MM-DD HH시 mm분'),
  },
];

function ApplicationsPage() {
  const { year, semester }: Semester = Route.useSearch();
  const { data: applications, isLoading } = useQuery({
    queryKey: ['all-applications', year, semester],
    queryFn: () => getAllApplications({ year, semester }),
  });

  return (
    <Box>
      <Title
        title='스터디 신청서 관리'
        label='모든 스터디 신청서를 관리합니다.'
      />
      <Layout>
        <AllApplicationFilter year={year} semester={semester} />
        <Table
          loading={isLoading}
          columns={columns}
          rows={applications}
          getRowId={(row: Application) => row.user_id}
        />
      </Layout>
    </Box>
  );
}
