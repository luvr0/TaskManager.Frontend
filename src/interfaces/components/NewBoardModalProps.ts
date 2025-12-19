export interface NewBoardModalProps {
  open: boolean;
  onClose: () => void;
  onCreate?: (name: string) => void;
  defaultName?: string;
}
