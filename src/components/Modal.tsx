import * as React from 'react';
import Dialog from '@mui/material/Dialog';

interface ModalProps {
  children: React.ReactElement;
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Modal = ({ children, open, setOpen }: ModalProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose}>
        {children}
      </Dialog>
    </div>
  );
};
export default Modal;
