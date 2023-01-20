import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { NbaCollection } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const getErrorMessages = (
  type: string,
  minLength?: number,
  maxLength?: number
) => {
  switch (type) {
    case 'required':
      return 'This field is required';
    case 'minLength':
      return `This field is too short, ${minLength} characters minimum`;
    case 'maxLength':
      return `This field is too long, ${maxLength} characters maximum`;
    default:
      return '';
  }
};

export type Inputs = {
  title: string;
  description: string;
};

interface CollectionListItemProps {
  id?: string;
  open: boolean;
  defaultValues?: Inputs;
  onClose: () => void;
  setData?: (values: Inputs) => void;
}

function FormCollectionDialog({
  id,
  open,
  defaultValues,
  onClose,
  setData
}: CollectionListItemProps) {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDeleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const onCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const onOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const { control, handleSubmit, reset } = useForm<Inputs>({
    defaultValues
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (id) {
      onUpdateCollection(data);
    } else {
      onCreateCollection(data);
    }
  };

  const onCreateCollection = async ({ title, description }: Inputs) => {
    setLoading(true);
    try {
      const res = await axios.post<NbaCollection>('/api/nba-collection', {
        collection: {
          title,
          description
        }
      });

      router.push(`/dashboard/collections/${res.data.id}`);
    } catch (e) {
      setLoading(false);
    }
  };

  const onUpdateCollection = async ({ title, description }: Inputs) => {
    setLoading(true);
    try {
      const res = await axios.put<NbaCollection>(`/api/nba-collection/${id}`, {
        collection: {
          title,
          description
        }
      });
      reset(res.data);
      setData(res.data);
    } finally {
      // catch (e) {
      //   setLoading(false);
      // }
      setLoading(false);
      onClose();
    }
  };

  const onDeleteCollection = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`/api/nba-collection/${id}`);
      router.replace('/dashboard');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>{id ? 'Edit' : 'Create a new'} collection</DialogTitle>
        <DialogContent sx={{ px: 2, pb: 0 }}>
          <Box py={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: true, minLength: 5, maxLength: 30 }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Title"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={getErrorMessages(
                          fieldState.error?.type,
                          5,
                          30
                        )}
                        inputProps={{
                          minLenght: 5,
                          maxLength: 70
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: true, minLength: 5, maxLength: 70 }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        error={!!fieldState.error}
                        helperText={getErrorMessages(
                          fieldState.error?.type,
                          5,
                          70
                        )}
                        inputProps={{
                          minLenght: 5,
                          maxLength: 70
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </form>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 1 }}>
          {id && (
            <Button
              variant="outlined"
              color="error"
              onClick={onOpenDeleteDialog}
            >
              Delete
            </Button>
          )}
          <Stack spacing={1} direction="row" flex={1} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={() => {
                reset(defaultValues);
                onClose();
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              {id ? 'Save' : 'Create'}
            </LoadingButton>
          </Stack>
        </DialogActions>
      </Dialog>
      <Dialog onClose={onCloseDeleteDialog} open={openDeleteDialog}>
        <DialogTitle>
          Are you sure you want to delete this collection?
        </DialogTitle>
        <DialogActions>
          <Button onClick={onCloseDeleteDialog}>Cancel</Button>
          <LoadingButton
            loading={isDeleteLoading}
            variant="contained"
            color="error"
            onClick={onDeleteCollection}
          >
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormCollectionDialog;
