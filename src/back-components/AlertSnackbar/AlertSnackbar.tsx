import Portal from '@mui/base/Portal';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface AlertSnackbarProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

export default function AlertSnackbar({
  message,
  open,
  onClose
}: AlertSnackbarProps) {
  return (
    <Portal>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        message={message}
      >
        <Alert
          onClose={onClose}
          severity="error"
          sx={{
            width: '100%',
            color: 'rgba(102, 10, 26, 1)',
            backgroundColor: 'rgba(255, 232, 236, 1)'
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Portal>
  );
}
