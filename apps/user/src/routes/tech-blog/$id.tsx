import Markdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { Box, Typography } from '@mui/material';

import { getTechBlog } from '@services/post.service';
import { createFileRoute } from '@tanstack/react-router';
import dayjs from '@utils/dayjs';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

export const Route = createFileRoute('/tech-blog/$id')({
  loader: ({ params }) => getTechBlog(params.id),
  component: TechBlogPage,
});

function TechBlogPage() {
  const blog = Route.useLoaderData();
  return (
    <Box
      sx={{
        px: { xs: 4, md: 6, xl: 12 },
        pb: 4,
        margin: 'auto',
        width: { xs: '100%', md: 760 },
      }}
    >
      <Box pt={12} pb={4}>
        <Typography variant='displaySmall'>{blog.title}</Typography>
      </Box>
      <Box pb={4}>
        <Typography variant='labelMedium' fontWeight={400} component={'p'}>
          {blog.author_name}
        </Typography>
        <Typography
          variant='labelSmall'
          fontWeight={400}
          component={'p'}
          color={'text.secondary'}
        >
          {dayjs(blog.created_at).format('YYYY년 MM월 DD일')}
        </Typography>
      </Box>
      <Markdown
        children={blog.content}
        className={'markdown'}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                PreTag={'div'}
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      />
    </Box>
  );
}
