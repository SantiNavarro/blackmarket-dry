/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement, forwardRef, Ref } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import '../styles/containers/modal.scss';
import { TransitionProps } from '@mui/material/transitions';

interface ModalProps {
  children: ReactElement | ReactElement[];
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: ReactElement<any, any>;
    },
    ref: Ref<unknown>
  ) => {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

const Modal = ({ children, open, setOpen }: ModalProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <button className="modal-close-btn" onClick={() => setOpen(false)} type="submit">
          X
        </button>
        {children}
      </Dialog>
    </div>
  );
};
export default Modal;
