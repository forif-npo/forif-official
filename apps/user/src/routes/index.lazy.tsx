import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/system';

import Box1 from '@assets/images/main/box1.svg';
import Box2 from '@assets/images/main/box2.svg';
import Box3 from '@assets/images/main/box3.svg';
import Box4 from '@assets/images/main/box4.svg';
import Box5 from '@assets/images/main/box5.svg';
import { Button } from '@packages/components/Button';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { Link, createLazyFileRoute } from '@tanstack/react-router';

import GravityBox from '@components/main/GravityBox';
import AnimatedContainer from '@components/study/AnimatedStudyContainer';

import { useSignIn } from '@hooks/useSignIn';

export const Route = createLazyFileRoute('/')({
  component: Home,
});

function Home() {
  const { handleSignIn } = useSignIn();

  return (
    <main>
      <CenteredBox
        sx={{
          paddingX: 3,
          paddingTop: 12,
          paddingBottom: 3,
          gap: 3,
          textAlign: 'center',
          maxWidth: '780px',
          margin: 'auto',
        }}
      >
        <Typography
          variant='displayLarge'
          color='text.primary'
          sx={{ textTransform: 'uppercase' }}
        >
          Upgrade your passion
        </Typography>
        <Typography variant='titleLarge' fontWeight={300} color='text.primary'>
          지식 공유의 선순환을 행하고, 이를 토대로 함께 성장하고자 합니다. 지금
          선순환에 동참해주세요.
        </Typography>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Button variant='contained' onClick={handleSignIn}>
            부원 가입하기
          </Button>
          <Link to='/apply/mentor'>
            <Button variant='outlined'>멘토 신청하기</Button>
          </Link>
        </Stack>
        <AnimatedContainer>스터디 목록이 들어갈 자리입니다.</AnimatedContainer>
      </CenteredBox>
      <Box sx={{ backgroundColor: '#1D40BA' }}>
        <GravityBox images={[Box1, Box2, Box3, Box4, Box5]} />
      </Box>
    </main>
  );
}
