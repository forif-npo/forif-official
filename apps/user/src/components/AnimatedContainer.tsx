import * as React from 'react';
import { Children, ReactNode, useRef } from 'react';

import { Typography } from '@mui/material';
import { Box, useMediaQuery, useTheme } from '@mui/system';

import { Button } from '@packages/components/Button';
import { motion, useAnimation, useInView } from 'framer-motion';

const childVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.3 },
  }),
};

const AnimatedChild = ({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={controls}
      variants={childVariants}
      custom={index}
      whileHover={{
        y: -10,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedContainer = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));

  const getGridTemplateColumns = () => {
    if (isXs) return 'repeat(1, 1fr)';
    if (isSm) return 'repeat(2, 1fr)';
    return 'repeat(3, 1fr)';
  };

  return (
    <Box
      sx={{
        borderRadius: 1,
        padding: 2,
        boxShadow: 3,
        border: '1px solid',
        borderColor: 'divider',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        gap: 2,
      }}
    >
      <Typography variant='titleLarge'>2024-1 스터디 목록</Typography>
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: getGridTemplateColumns(),
          gap: '32px',
          mb: 4,
        }}
      >
        {Children.map(children, (child, index) => (
          <AnimatedChild key={index} index={index}>
            {child}
          </AnimatedChild>
        ))}
      </Box>
      <Button variant='contained' size='large'>
        더 많은 스터디 보기
      </Button>
    </Box>
  );
};

export default AnimatedContainer;
