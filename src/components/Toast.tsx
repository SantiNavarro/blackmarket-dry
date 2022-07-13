import Snackbar from '@mui/material/Snackbar';

interface ToastProps {
  open: boolean;
}

const Toast = ({ open = false }: ToastProps) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      message="Your credentials are invalid, or you are not Signed Up"
      key="topright"
    />
  );
};

export default Toast;
