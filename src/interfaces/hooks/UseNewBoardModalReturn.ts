export interface UseNewBoardModalReturn {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
  createAndClose: (name: string) => void;
  setOpen: (v: boolean) => void;
}
