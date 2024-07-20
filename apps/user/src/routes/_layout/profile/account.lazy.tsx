import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';

import { Button } from '@packages/components/Button';
import Image from '@packages/components/Image';
import { UserProfile } from '@packages/components/types/user';
import { useQuery } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { authApi } from 'src/services/axios-instance';

import { Title } from '@components/Title';
import { BizMsgSwitch } from '@components/profile/account/BizMsgSwitch';

export const Route = createLazyFileRoute('/_layout/profile/account')({
  component: ProfileAccount,
});

const mockUser: UserProfile = {
  id: '2023063845',
  email: 'standardstar@hanyang.ac.kr',
  department: '정보시스템학과',
  name: '표준성',
  phoneNumber: '010-2078-9868',
  picture:
    'https://lh3.googleusercontent.com/a/ACg8ocLQyzi1LFdApmby3XLnDjCzXSRrPHffD3e1UXDbPnmkCi3gMdg=s96-c',
};

function ProfileAccount() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['account'],
    queryFn: () => authApi.get('/profile').then((res) => res.data),
    retry: 1,
  });

  console.log(data, error);

  return (
    <Box width={'100%'}>
      <Title
        title='계정'
        label='정보, 개인 정보 보호 및 보안 설정을 관리하여 나에게 맞는 방식으로 Google을 사용할 수 있습니다.'
        pt={0}
      />
      <Box
        sx={{ px: { xs: 4, md: 8, xl: 12 }, pb: 4, margin: 'auto' }}
        maxWidth={1120}
      >
        <Grid container spacing={{ xs: 2, md: 4, xl: 6 }}>
          <Grid item xs={12}>
            <Card
              sx={{
                minWidth: 275,
                backgroundColor: 'background.default',
                borderRadius: 3,
                boxShadow: 0,
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CardContent>
                <Typography
                  variant='titleMedium'
                  sx={{ mb: 2 }}
                  fontWeight={'bold'}
                >
                  기본정보
                </Typography>
                <Typography variant='bodyMedium' sx={{ mb: 2 }}>
                  일부 정보가 Google 서비스를 사용하는 다른 사람에게 표시될 수
                  있습니다.
                </Typography>
                <Stack divider={<Divider />}>
                  <Button
                    variant='text'
                    sx={{
                      justifyContent: 'flex-start',
                      py: 2,
                      borderRadius: 2,
                    }}
                  >
                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      width={'100%'}
                    >
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        flexWrap={'wrap'}
                        width={'100%'}
                      >
                        <Typography
                          variant='labelSmall'
                          sx={{ mr: 3 }}
                          fontWeight={400}
                          width={120}
                          textAlign={'start'}
                        >
                          프로필 사진
                        </Typography>
                        <Typography
                          variant='labelSmall'
                          fontWeight={400}
                          textAlign={'start'}
                          flexGrow={1}
                        >
                          기본 프로필 사진은 구글 계정의 사진입니다.
                        </Typography>
                      </Stack>
                      <Image
                        src={mockUser.picture!}
                        alt='유저 프로필 이미지'
                        fallback={mockUser.picture!}
                        width={56}
                        height={56}
                        style={{ borderRadius: '100%' }}
                      />
                    </Stack>
                  </Button>
                  <BasicInfoCard title='이름' value={mockUser.name} />
                  <BasicInfoCard title='학과' value={mockUser.department} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} md={6}>
            <Card
              sx={{
                minWidth: 275,
                backgroundColor: 'background.default',
                borderRadius: 3,
                boxShadow: 0,
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CardContent>
                <Typography
                  variant='titleMedium'
                  sx={{ mb: 2 }}
                  fontWeight={'bold'}
                >
                  휴대폰
                </Typography>
                <Typography variant='bodySmall' sx={{ mb: 2 }}>
                  기입된 전화번호는 알림톡 서비스, 행사 관련 문의 등에
                  사용됩니다.
                </Typography>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >
                  <Typography variant='labelLarge'>
                    {mockUser.phoneNumber}
                  </Typography>
                  <Button variant='outlined'>변경</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} md={6}>
            <Card
              sx={{
                minWidth: 275,
                backgroundColor: 'background.default',
                borderRadius: 3,
                boxShadow: 0,
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CardContent>
                <Typography
                  variant='titleMedium'
                  sx={{ mb: 2 }}
                  fontWeight={'bold'}
                >
                  알림톡 서비스
                </Typography>
                <Typography variant='bodySmall' sx={{ mb: 2 }}>
                  포리프에서 진행하는 행사, 공지사항 등을 알림톡으로 받아보세요.
                </Typography>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >
                  <Typography
                    component={'a'}
                    href='http://pf.kakao.com/_xiydUG'
                    target='_blank'
                    variant='labelLarge'
                    color={'primary'}
                    fontWeight={700}
                  >
                    포리프 카카오톡 공식 채널
                  </Typography>
                  <BizMsgSwitch />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

function BasicInfoCard({
  title,
  value,
}: {
  title: string;
  value: string | null;
}) {
  return (
    <Button
      variant='text'
      sx={{
        justifyContent: 'flex-start',
        py: 2,
        borderRadius: 2,
      }}
    >
      <Stack direction={'row'} alignItems={'center'} width={'100%'}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          flexWrap={'wrap'}
          width={'100%'}
        >
          <Typography
            variant='labelSmall'
            sx={{ mr: 3 }}
            fontWeight={400}
            width={120}
            textAlign={'start'}
          >
            {title}
          </Typography>
          <Typography
            variant='labelLarge'
            fontWeight={400}
            textAlign={'start'}
            flexGrow={1}
          >
            {value}
          </Typography>
        </Stack>
        <ChevronRightIcon fontSize='large' />
      </Stack>
    </Button>
  );
}
