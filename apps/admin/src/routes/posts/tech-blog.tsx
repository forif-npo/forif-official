import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import Close from '@mui/icons-material/Close';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import {
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowParams,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { Select } from '@packages/components/Select';
import { FormInput } from '@packages/components/form/FormInput';
import { FormSelect } from '@packages/components/form/FormSelect';
import { Table } from '@packages/components/table/Table';
import { TechBlog } from '@packages/components/types/post';
import { BLOG_TAG_OPTIONS } from '@packages/constants';
import {
  deleteTechBlog,
  editTechBlog,
  getTechBlog,
  getTechBlogs,
} from '@services/post.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { getUser } from '@stores/user.store';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { Layout } from '@components/common/Layout';
import { Title } from '@components/common/Title';
import TechBlogDialog from '@components/posts/TechBlogDialog';

export const Route = createFileRoute('/posts/tech-blog')({
  component: TechBlogPage,
});

function TechBlogPage() {
  const { openDualButtonDialog, openSingleButtonDialog, closeDialog } =
    useDialogStore();

  const { name } = getUser();

  const {
    data: techBlogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tech-blogs'],
    queryFn: () => getTechBlogs(),
  });

  if (error) {
    console.error(error);
  }

  const queryClient = useQueryClient();
  const tags = BLOG_TAG_OPTIONS.map((tag) => tag.label);
  const [isAdd, setIsAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<TechBlog>({
    defaultValues: {
      title: '',
      content: '',
      author_name: '표준성',
      type: '기술 블로그',
      tag: 'FRONTEND',
      id: 0,
    },
  });

  const content = form.watch('content');

  const handleRowClick = async (row: GridRowParams) => {
    try {
      const techBlog: TechBlog = await getTechBlog(row.id as string);

      form.setValue('title', techBlog.title);
      form.setValue('content', techBlog.content);
      form.setValue('created_by', techBlog.created_by);
      form.setValue('author_name', techBlog.author_name);
      form.setValue('tag', techBlog.tag);
      form.setValue('id', techBlog.id);

      setOpen(true);
    } catch (e) {
      console.error(e);
      openSingleButtonDialog({
        title: '글 불러오기 실패',
        message: '해당 글을 불러오는데 실패했습니다. 다시 시도해주세요.',
        dialogIconType: DialogIconType.WARNING,
        mainButtonText: '확인',
      });
    }
  };

  const handleEdit = async () => {
    const formData = form.getValues();

    try {
      await editTechBlog(formData);
      openSingleButtonDialog({
        title: '수정 완료',
        message: '해당 글 수정을 완료했습니다.',
        dialogIconType: DialogIconType.CONFIRM,
        mainButtonText: '확인',
      });
      queryClient.invalidateQueries({
        queryKey: ['tech-blogs'],
        refetchType: 'active',
      });
      setOpen(false);
    } catch (e) {
      console.error(e);
      openSingleButtonDialog({
        title: '수정 실패',
        message: '글 수정에 실패했습니다. 다시 시도해주세요.',
        dialogIconType: DialogIconType.WARNING,
        mainButtonText: '확인',
      });
    }
  };

  const handleClose = () => {
    form.reset();
    setIsEdit(false);
    setOpen(false);
  };

  const handleAddClose = () => {
    form.reset();
    setIsAdd(false);
  };

  const handleDelete = async (id: GridRowId) => {
    openDualButtonDialog({
      title: '기술 블로그 글 삭제',
      message: '해당 기술 블로그 글을 삭제할까요?',
      mainButtonText: '삭제',
      dialogIconType: DialogIconType.WARNING,
      mainButtonAction: async () => {
        try {
          await deleteTechBlog(id);
          queryClient.invalidateQueries({
            queryKey: ['tech-blogs'],
            refetchType: 'active',
          });
          closeDialog();
          openSingleButtonDialog({
            title: '삭제 완료',
            message: '해당 기술 블로그 삭제를 완료했습니다.',
            dialogIconType: DialogIconType.CONFIRM,
            mainButtonText: '확인',
          });
        } catch (e) {
          console.error(e);
        }
      },
      subButtonText: '취소',
    });
  };

  function AddFooter() {
    return (
      <GridToolbarContainer
        sx={{
          py: 2,
        }}
      >
        <Button variant='outlined' fullWidth onClick={() => setIsAdd(true)}>
          기술 블로그 글 추가
        </Button>
      </GridToolbarContainer>
    );
  }
  const columns: GridColDef<TechBlog>[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 0.5,
    },
    {
      field: 'title',
      headerName: '제목',
      flex: 2,
    },
    {
      field: 'tag',
      headerName: '태그',
      flex: 1,
    },
    {
      field: 'author_name',
      headerName: '작성자',
      flex: 1,
    },
    {
      field: 'created_at',
      headerName: '작성일',
      flex: 1,
      type: 'date',
      valueFormatter: (params) => dayjs(params).format('YYYY-MM-DD'), // Format the date
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '삭제',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteOutline />}
            label='Delete'
            sx={{
              color: 'primary.main',
            }}
            onClick={() => handleDelete(id)}
          />,
        ];
      },
    },
  ];

  return (
    <Box>
      <Title title='기술 블로그' label='일기를 생활화 합시다' />
      <Layout>
        <Typography variant='bodySmall'>
          현재 <strong>{name}</strong>님으로 로그인되어 있습니다. 작성자 이름에
          해당 이름이 자동으로 입력됩니다.
        </Typography>
        <Typography variant='bodySmall'>
          태그는 <strong>[{tags.join(', ')}]</strong> 중에서 선택해주세요.
        </Typography>
        <Table
          rows={techBlogs}
          loading={isLoading}
          columns={columns}
          footer={AddFooter}
          onRowClick={handleRowClick}
          sx={{
            mt: 2,
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 30,
              },
            },
          }}
          pageSizeOptions={[30]}
        />
      </Layout>
      <Dialog
        open={open}
        fullScreen={true}
        onClose={handleClose}
        aria-labelledby='tech-blogs-add-dialog-title'
      >
        <DialogTitle
          id='tech-blogs-add-dialog-title'
          component={'div'}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            px: 2,
          }}
        >
          <IconButton aria-label='close-top' onClick={handleClose} autoFocus>
            <Close
              sx={{
                color: (theme) => theme.palette.text.secondary,
              }}
            />
          </IconButton>
          {isEdit ? (
            <FormInput
              control={form.control}
              name='title'
              sx={{
                width: '90%',
              }}
            />
          ) : (
            <Typography variant='titleMedium' maxWidth={'90%'}>
              {form.getValues('title')}
            </Typography>
          )}
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={() => setIsEdit(!isEdit)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          {isEdit ? <DoneIcon color='primary' /> : <EditIcon color='primary' />}
        </IconButton>
        <DialogContent
          sx={{
            position: 'relative',
            minWidth: '560px',
            px: 2,
            py: 6,
          }}
        >
          {isEdit ? (
            <>
              <FormSelect
                control={form.control}
                name='tag'
                options={BLOG_TAG_OPTIONS}
                fullWidth
                multiline
                sx={{
                  mb: 2,
                }}
              />
              <Stack direction={'row'} mt={2} gap={2}>
                <FormInput
                  control={form.control}
                  placeholder='# 해커톤 개최 안내'
                  name='content'
                  multiline
                  minRows={12}
                  sx={{
                    flexGrow: 1,
                    flexBasis: '50%',
                    width: '50%',
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
            </>
          ) : (
            <>
              <Select
                val={form.getValues('tag')}
                placeholder=''
                options={BLOG_TAG_OPTIONS}
                disabled
                sx={{
                  mb: 2,
                }}
              />
              <Box
                border={1}
                borderColor={'divider'}
                p={2}
                sx={{
                  flexGrow: 1,
                  width: '100%',
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
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit} disabled={isEdit}>
            수정
          </Button>
          <Button onClick={handleClose} autoFocus>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
      <TechBlogDialog
        open={isAdd}
        handleClose={handleAddClose}
        form={form}
        tag_options={BLOG_TAG_OPTIONS}
      />
    </Box>
  );
}
