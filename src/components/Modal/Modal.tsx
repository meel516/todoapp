export const Modal = ({ children, isOpen, onClose }) => {
  return isOpen ? (
    <div className="inset-0 bg-transparent flex justify-center  items-center">
      <div className="w-[500px] bg-white flex flex-col items-center relative">
        <div className="w-4 aspect-square self-end" onClick={onClose}>
          x
        </div>
        <div>{children}</div>
      </div>
    </div>
  ) : null;
};
