import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { SyntheticEvent } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const blurTarget = (event: SyntheticEvent) => {
  event.target instanceof HTMLElement && event.target.blur();
};

interface IFormInputs {
  rarity: string;
  cardNumber: string;
}

interface FormDialogProps {
  open: boolean;
  handleClose: () => void;
}

function FormDialog({ open, handleClose }: FormDialogProps) {
  const { control, handleSubmit } = useForm<IFormInputs>();
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="alert-dialog-title">
          Add Player to your watchlist
        </DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing={2}>
            <Controller
              name="rarity"
              control={control}
              defaultValue="limited"
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Rarity
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name={field.name}
                    onChange={field.onChange}
                    value={field.value}
                  >
                    <FormControlLabel
                      value="limited"
                      control={<Radio />}
                      label="Limited"
                    />
                    <FormControlLabel
                      value="rare"
                      control={<Radio />}
                      label="Rare"
                    />
                    <FormControlLabel
                      value="superRare"
                      control={<Radio />}
                      label="Super Rare"
                    />
                    <FormControlLabel
                      value="unique"
                      control={<Radio />}
                      label="Unique"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
            <Controller
              name="cardNumber"
              control={control}
              rules={{ min: 1, max: 4, pattern: /[0-9]*/ }}
              render={({ field }) => (
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Card number
                  </FormLabel>
                  <TextField
                    {...field}
                    inputProps={{
                      max: 4,
                      min: 1
                    }}
                    size="small"
                    type="number"
                    onWheel={blurTarget}
                  />
                </FormControl>
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default FormDialog;
