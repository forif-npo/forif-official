import { Box, Typography } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import { Layout } from '@components/common/Layout';
import { Title } from '@components/common/Title';

export const Route = createFileRoute('/dashboard/')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <Box width={'100%'}>
      <Title title='Dashboard' label='운영진 / 멘토를 위한 대시보드입니다.' />
      <Layout>
        <Typography variant='titleMedium' textAlign={'center'}>
          추후에 GA4 분석 데이터가 들어갈 예정입니다:)
        </Typography>
      </Layout>
    </Box>
  );
}
