import { Grid, Skeleton } from '@mui/material';

interface BlogSkeletonProps {
  count?: number;
}

const BlogSkeleton = ({ count = 3 }: BlogSkeletonProps) => {
  return (
    <Grid>
      {[...Array(count)].map((_, index) => (
        <Grid item xs={12} key={index}>
          <Skeleton variant='text' height={140} animation='wave' />
          <Skeleton variant='text' height={28} animation='wave' />
          <Skeleton variant='text' height={28} animation='wave' />
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogSkeleton;
