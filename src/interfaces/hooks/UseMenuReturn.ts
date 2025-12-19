export interface UseMenuReturn {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleOpen: (e: React.MouseEvent<HTMLElement>) => void;
  handleClose: () => void;
}
