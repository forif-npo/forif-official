import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Stack } from '@mui/system';

import { Button } from '@packages/components/Button';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { Link, createLazyFileRoute } from '@tanstack/react-router';

import StandingPerson1 from '../assets/images/peep-main-1.svg?react';
import StandingPerson2 from '../assets/images/peep-main-2.svg?react';
import AnimatedContainer from '../components/AnimatedContainer';
import { StudyCard, StudyCardProps } from '../components/Card';
import { LogoWall } from '../components/LogoWall';

export const Route = createLazyFileRoute('/')({
  component: Home,
});

const studies: StudyCardProps[] = [
  {
    title: 'React CRUD1',
    image: 'https://imgur.com/TersiLo.png',
    href: '/studies',
    mentor: 'Jun Seong Pyo',
  },
  {
    title: 'React CRUD2',
    image: 'https://imgur.com/TersiLo.png',
    href: '/studies',
    mentor: 'Jun Seong Pyo',
  },
  {
    title: 'React CRUD3',
    image: 'https://imgur.com/TersiLo.png',
    href: '/studies',
    mentor: 'Jun Seong Pyo',
  },
];

function Home() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));

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
          <Link to='/apply/member'>
            <Button variant='contained'>부원 신청하기</Button>
          </Link>
          <Link to='/apply/mentor'>
            <Button variant='outlined'>멘토 신청하기</Button>
          </Link>
        </Stack>
        <AnimatedContainer>
          {studies.map((study) => (
            <StudyCard
              key={study.title}
              title={study.title}
              image={study.image}
              mentor={study.mentor}
              href={study.href}
            />
          ))}
        </AnimatedContainer>
        {matches && (
          <>
            <StandingPerson1
              width={200}
              height={300}
              style={{ position: 'fixed', right: 16, bottom: 8, zIndex: 1 }}
            />
            <StandingPerson2
              width={200}
              height={300}
              style={{ position: 'fixed', left: 16, bottom: 8, zIndex: 1 }}
            />
          </>
        )}
      </CenteredBox>
      <LogoWall />
    </main>
  );
}
