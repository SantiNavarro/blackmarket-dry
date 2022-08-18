import Snackbar from '@mui/material/Snackbar';

interface ToastProps {
  open: boolean;
  message: string;
}

const Toast = ({ open = false, message }: ToastProps) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      message={message}
      autoHideDuration={1500}
      key="topright"
    />
  );
};

export default Toast;
