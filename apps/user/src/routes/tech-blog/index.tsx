import { SyntheticEvent, useState } from 'react';

import {
  Box,
  Chip,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';

import { getTechBlogs } from '@services/post.service';
import { useQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';

import { Title } from '@components/Title';
import BlogListItem from '@components/posts/BlogListItem';
import BlogSkeleton from '@components/posts/BlogSkeleton';

import useDeviceSize from '@hooks/useDeviceSize';

export const Route = createFileRoute('/tech-blog/')({
  component: TechBlogsPage,
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TechBlogsPage() {
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tech-blog'],
    queryFn: getTechBlogs,
  });

  if (error) {
    console.error(error);
  }

  const allTags = blogs
    ? Array.from(new Set(blogs.flatMap((blog) => blog.tag))).sort()
    : [];
  const sortedBlogs = blogs
    ? [...blogs].sort(
        (a, b) =>
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime(),
      )
    : [];
  const [value, setValue] = useState(0); // 탭 밸류: 0: 전체, 1: 개발, 2: 포리프 팀
  const [selectedTag, setSelectedTag] = useState<string>('');

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      setSelectedTag('');
    }
    if (newValue === 2) {
      setSelectedTag('FORIF TEAM');
    }
  };

  const { isTablet } = useDeviceSize();
  return (
    <Box sx={{ px: { xs: 4, md: 8, xl: 12 }, pb: 4, margin: 'auto' }}>
      <Title title='기술 블로그' label='' />
      <Stack direction='row' spacing={4} sx={{ width: '100%' }}>
        <Box sx={{ flexGrow: 2, width: '66.67%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='tech-blog-tabs'
            >
              <Tab label='전체' {...a11yProps(0)} />
              <Tab label='개발' {...a11yProps(1)} />
              <Tab label='포리프 팀' {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {isLoading ? (
              <BlogSkeleton />
            ) : (
              <List>
                {sortedBlogs.map((blog) => (
                  <Link key={blog.id} to={`/tech-blog/${blog.id}`}>
                    <BlogListItem post={blog} />
                  </Link>
                ))}
              </List>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {isLoading ? (
              <BlogSkeleton />
            ) : (
              <List>
                {sortedBlogs
                  .filter((blog) => {
                    if (selectedTag) {
                      return (
                        blog.tag === selectedTag && blog.tag !== 'FORIF TEAM'
                      );
                    }
                    return blog.tag !== 'FORIF TEAM';
                  })
                  .map((blog) => (
                    <Link key={blog.id} to={`/tech-blog/${blog.id}`}>
                      <BlogListItem post={blog} />
                    </Link>
                  ))}
              </List>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            {isLoading ? (
              <BlogSkeleton />
            ) : (
              <List>
                {sortedBlogs
                  .filter((blog) => blog.tag === 'FORIF TEAM')
                  .map((blog) => (
                    <Link key={blog.id} to={`/tech-blog/${blog.id}`}>
                      <BlogListItem post={blog} />
                    </Link>
                  ))}
              </List>
            )}
          </CustomTabPanel>
        </Box>
        {!isTablet && <Divider orientation='vertical' flexItem />}
        {!isTablet && (
          <Box
            sx={{
              flexGrow: 1,
              width: '33.33%',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant='labelSmall'
              fontWeight={500}
              pl={2}
              sx={{ color: 'text.secondary' }}
            >
              최신 글
            </Typography>
            <List
              sx={{
                '& .MuiListItemButton-root': {
                  pl: 2,
                  color: 'text.primary',
                },
              }}
            >
              {sortedBlogs.slice(0, 3).map((blog) => (
                <ListItemButton key={blog.id}>
                  <ListItemText
                    primary={blog.title}
                    secondary={blog.author_name}
                  />
                </ListItemButton>
              ))}
            </List>
            <Typography
              variant='labelSmall'
              fontWeight={500}
              pl={2}
              sx={{ color: 'text.secondary' }}
            >
              태그
            </Typography>
            <Box
              sx={{ display: 'flex', flexWrap: 'wrap', pl: 2, mt: 2, mb: 5 }}
            >
              {allTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  variant={tag === selectedTag ? 'filled' : 'outlined'}
                  color='primary'
                  sx={{ width: 'fit-content', mr: 1 }}
                  onClick={() => {
                    setSelectedTag(tag);
                    if (tag === 'FORIF TEAM') {
                      setValue(2);
                    } else {
                      setValue(1);
                    }
                  }}
                />
              ))}
            </Box>
            <Typography
              component={'p'}
              variant='labelSmall'
              fontWeight={500}
              pl={2}
              sx={{ color: 'text.secondary' }}
            >
              현재 글 작성은{' '}
              <a href='https://admin.forif.org' target='_blank'>
                <Typography
                  component={'span'}
                  variant='labelSmall'
                  sx={{ fontWeight: 'bold', color: 'text.primary' }}
                >
                  관리자 페이지
                </Typography>
              </a>
              를 통해 이루어지며, 멘토·운영진·홈페이지 관리자만 가능합니다. 글
              작성을 원하시는 분은 포리프 팀에 문의해주세요.
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
