
export const Modal: React.FC<{
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}> = ({ children, isOpen, onClose, className }) => {
  return isOpen ? (
    <div className="inset-0 bg-black/35 flex justify-center fixed items-center">
      <div className={`w-[500px] bg-white flex flex-col items-center relative ${className}`}>
        <div className="w-4 aspect-square self-end cursor-pointer" onClick={onClose}>
          x
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  ) : null;
};
