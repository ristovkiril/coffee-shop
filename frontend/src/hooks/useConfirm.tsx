import {
  Button, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import { ReactNode, useState } from 'react';

const useConfirm = (title: string, message: string): [ReactNode, () => Promise<boolean>] => {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

  const confirm = () => new Promise<boolean>((resolve, reject) => {
    setPromise({ resolve });
  });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog: ReactNode = (
    <Dialog
      open={promise !== null}
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText fontSize={18}>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant={"contained"}
          color={"primary"}
          sx={{ borderRadius: 5, color: "#FFF" }}
          onClick={handleConfirm}
        >
          Yes
        </Button>
        <Button
          variant={"outlined"}
          color={"primary"}
          sx={{ borderRadius: 5 }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );

  return [ConfirmationDialog, confirm];
};

export default useConfirm;