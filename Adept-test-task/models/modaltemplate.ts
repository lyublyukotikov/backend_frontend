interface ModalTemplateProps {
  drawerRef: RefObject<HTMLDivElement>;
  handleCloseModal: () => void;
  title: string;
  children: ReactNode;
} 