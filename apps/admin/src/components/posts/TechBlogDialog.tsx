import { ReactElement, forwardRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import CloseIcon from '@mui/icons-material/Close';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import { SelectOption } from '@packages/components/Select';
import { FormInput } from '@packages/components/form/FormInput';
import { FormSelect } from '@packages/components/form/FormSelect';
import { TechBlog } from '@packages/components/types/post';
import { addTechBlog } from '@services/post.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { useQueryClient } from '@tanstack/react-query';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

interface TechBlogDialogProps {
  open: boolean;
  handleClose: () => void;
  form: UseFormReturn<TechBlog>;
  tag_options: SelectOption[];
}

export default function TechBlogDialog({
  open,
  handleClose,
  form,
  tag_options,
}: TechBlogDialogProps) {
  const content = form.watch('content');
  const queryClient = useQueryClient();
  const { openSingleButtonDialog } = useDialogStore();
  const handleAdd = () => {
    const formData = form.getValues();
    try {
      addTechBlog({
        title: formData.title,
        content: formData.content!,
        tag: formData.tag,
      });
      openSingleButtonDialog({
        title: '기술 블로그 글 추가',
        message: '기술 블로그 글이 추가되었습니다.',
        dialogIconType: DialogIconType.CONFIRM,
        mainButtonText: '확인',
      });
      queryClient.invalidateQueries({
        queryKey: ['tech-blogs'],
        refetchType: 'active',
      });
      handleClose();
    } catch (err) {
      console.error(err);
      openSingleButtonDialog({
        title: '오류 발생',
        message:
          '기술 블로그 글 추가 중 오류가 발생했습니다. 다시 시도해주세요.',
        dialogIconType: DialogIconType.WARNING,
        mainButtonText: '확인',
      });
    }
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          backgroundColor: 'background.default',
        },
      }}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1 }}
            variant='titleMedium'
            component='div'
          >
            새로운 기술 블로그 글 추가
          </Typography>
          <Button autoFocus color='inherit' onClick={handleAdd}>
            추가
          </Button>
        </Toolbar>
      </AppBar>
      <Box width={'100%'} px={2} data-color-mode='light' py={4}>
        <FormSelect
          control={form.control}
          name='tag'
          options={tag_options}
          fullWidth
          multiline
          sx={{
            mb: 2,
          }}
        />
        <FormInput
          fullWidth
          control={form.control}
          name='title'
          label='글 제목을 작성해주세요.'
          placeholder='포리프 팀: 동아리 운영진'
        />
        <Stack direction={'row'} mt={2} gap={2}>
          <FormInput
            control={form.control}
            placeholder='마크다운 형식을 지원합니다'
            name='content'
            minRows={30}
            multiline
            sx={{
              flexGrow: 1,
              flexBasis: '50%',
              width: '50%',
              height: '100%',
            }}
          />
          <Box
            border={1}
            borderColor={'divider'}
            p={2}
            sx={{
              flexGrow: 1,
              flexBasis: '50%',
              width: '50%',
            }}
          >
            <Markdown
              children={content}
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
        </Stack>
      </Box>
    </Dialog>
  );
}
