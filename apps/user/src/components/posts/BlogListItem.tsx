import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Box, Chip, ListItemButton, Stack, Typography } from '@mui/material';

import { TechBlog } from '@packages/components/types/post';
import dayjs from '@utils/dayjs';

interface BlogListItemProps {
  post: TechBlog;
}

const BlogListItem = ({ post }: BlogListItemProps) => {
  const { title, content, created_at, author_name, tag } = post;

  return (
    <ListItemButton sx={{ py: 4 }} disableRipple disableTouchRipple>
      <Box width={'100%'}>
        <Chip label={tag} variant='outlined' size='small' sx={{ mb: 1 }} />
        <Typography
          variant='labelLarge'
          component='h2'
          gutterBottom
          color={'text.primary'}
        >
          {title}
        </Typography>
        <Typography
          variant='bodyMedium'
          color='text.secondary'
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 1,
          }}
        >
          {content}
        </Typography>
        <Stack direction='row' spacing={1} alignItems='center'>
          <Typography
            variant='labelSmall'
            color='text.secondary'
            fontWeight={400}
          >
            {dayjs(created_at).format('YYYY-MM-DD')}
          </Typography>
          <FiberManualRecordIcon
            sx={{ fontSize: 4, color: 'text.secondary', fontWeight: 400 }}
          />
          <Typography
            variant='labelSmall'
            color='text.secondary'
            fontWeight={400}
          >
            {author_name}
          </Typography>
        </Stack>
      </Box>
    </ListItemButton>
  );
};

export default BlogListItem;
