import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

interface PopsProps {
  wrapper: React.ReactElement;
  children: React.ReactNode;
  className?: string;
  popRef?: React.RefObject<HTMLDivElement>;
  boxRef?: React.RefObject<HTMLDivElement>;
}

interface ItemProps {
  children: React.ReactNode;
  className?: string;
  handleClose: () => void;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  [key: string]: any;
}

const Pops: React.FC<PopsProps> & { Item: React.FC<ItemProps> } = ({
  wrapper,
  children,
  className,
  popRef: containerRef,
  boxRef: tableRef,
}) => {
  const [isOpen, setOpen] = useState(false);
  const optionalRef = useRef<HTMLDivElement>(null);
  if (!containerRef) containerRef = optionalRef;

  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleToggle = () => setOpen((prev) => !prev);

  const handleWrapper = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    handleToggle();
    wrapper.props.onClick?.(event);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef?.current &&
      !containerRef.current.contains(event.target as Node) &&
      buttonRef?.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useLayoutEffect(() => {
    const container = tableRef?.current;
    const popup = containerRef?.current;

    if (container && popup) {
      const containerRect = container.getBoundingClientRect();
      const popupRect = popup.getBoundingClientRect();

      if (popupRect.right < containerRect.right) {
        popup.style.left = "0px";
        popup.style.right = "unset";
      } else if (popupRect.left > containerRect.left) {
        popup.style.right = "0px";
        popup.style.left = "unset";
      }

      if (popupRect.bottom > containerRect.bottom) {
        popup.style.bottom = "0px";
        popup.style.top = "unset";
      }

      if (popupRect.top < containerRect.top) {
        popup.style.top = "0px";
      }
    }
  }, [isOpen]);

  return (
    <div className="relative flex justify-end">
      {React.cloneElement(wrapper, {
        onClick: handleWrapper,
        ref: buttonRef,
      })}
      {isOpen && (
        <div
          ref={containerRef}
          className={`absolute z-10 bg-white rounded-sm shadow-custom py-2 flex flex-col ${className}`}
        >
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child, { handleClose })
              : child,
          )}
        </div>
      )}
    </div>
  );
};

const Item: React.FC<ItemProps> = ({
  children,
  className,
  handleClose,
  onClick,
  ...rest
}) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleClose();
    onClick?.(event);
  };

  return (
    <div
      className={`flex p-2 gap-2 ${className}`}
      {...rest}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

Pops.Item = Item;

export default Pops;
