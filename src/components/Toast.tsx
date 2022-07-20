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
      key="topright"
    />
  );
};

export default Toast;
