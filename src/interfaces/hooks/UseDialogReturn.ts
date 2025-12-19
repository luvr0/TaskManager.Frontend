export interface UseDialogReturn {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  toggle: () => void;
  setOpen: (open: boolean) => void;
}
