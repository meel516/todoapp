import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

const Pops = ({
  wrapper,
  children,
  className,
  popRef: containerRef,
  boxRef: tableRef,
}) => {
  const [isOpen, setOpen] = useState(false);
  // const containerRef = useRef(null);
  const optionalRef = useRef(null);
  if (containerRef === undefined) {
    containerRef = optionalRef;
  }

  const buttonRef = useRef(null);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };
  const handleWrapper = (event) => {
    handleToggle();
    if (wrapper.props.onClick) {
      wrapper.props.onClick(event);
    }
  };

  const handleClickOutside = (event) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
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
  //   const container = containerRef.current;
  //   const popup = boxRef.current;
  //   console.log(container, popup, "kik");

  //   if (container && popup) {
  //     const containerRect = container.getBoundingClientRect();
  //     const popupRect = popup.getBoundingClientRect();

  //     // Check if the popup's right side exceeds the container's right side
  //     if (popupRect.right > containerRect.right) {
  //       popup.style.left = `${containerRect.right - popupRect.width}px`;
  //     }

  //     // Check if the popup's left side exceeds the container's left side
  //     if (popupRect.left < containerRect.left) {
  //       popup.style.left = `${containerRect.left}px`;
  //     }

  //     // Adjust the popup to be within the container on the Y axis if necessary
  //     if (popupRect.bottom > containerRect.bottom) {
  //       popup.style.top = `${containerRect.bottom - popupRect.height}px`;
  //     }

  //     if (popupRect.top < containerRect.top) {
  //       popup.style.top = `${containerRect.top}px`;
  //     }
  //   }
  // }, [isOpen, boxRef]);
  useLayoutEffect(() => {
    const container = tableRef?.current;
    const popup = containerRef?.current;

    if (container && popup) {
      const containerRect = container.getBoundingClientRect();
      const popupRect = popup.getBoundingClientRect();

      // Check if the popup's right side exceeds the container's right side
      // if (popupRect.right > containerRect.right) {
      //   popup.style.left = `${containerRect.right - popupRect.width}px`;
      // }

      // Check if the popup's left side exceeds the container's left side
      // if (popupRect.left < containerRect.left) {
      //   popup.style.left = `${containerRect.left}px`;
      // }
      if (popupRect.right < containerRect.right) {
        popup.style.left = "0px";
        popup.style.right = "unset"; // Ensure right is not conflicting
      }

      // Check if the popup's left side exceeds the container's left side
      else if (popupRect.left > containerRect.left) {
        popup.style.right = "0px";
        popup.style.left = "unset"; // Ensure right is not conflicting
      }

      // Adjust the popup to be within the container on the Y axis if necessary
      if (popupRect.bottom > containerRect.bottom) {
        popup.style.bottom = "0px";
        popup.style.top = "unset";
      }

      if (popupRect.top < containerRect.top) {
        popup.style.top = "0px";
      }

      console.log(
        popupRect.bottom,
        containerRect.bottom,
        popupRect.top,
        containerRect.top,
        "kik"
      );
    }
  }, [isOpen]);

  return (
    <>
      <div className="relative flex justify-end">
        {React.cloneElement(wrapper, {
          onClick: handleWrapper,
          ref: buttonRef,
        })}
        {isOpen ? (
          <div
            ref={containerRef}
            className={`absolute  z-10 bg-white rounded-sm shadow-custom py-2 flex flex-col ${className}`}
          >
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, { handleClose });
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};
const Item = ({ children, className, handleClose, onClick, ...rest }) => {
  const handleClick = (event) => {
    handleClose();
    if (onClick) {
      onClick(event);
    }
  };
  return (
    <>
      <div
        className={`flex p-2 gap-2 ${className}`}
        {...rest}
        onClick={handleClick}
      >
        {children}
      </div>
    </>
  );
};
Pops.Item = Item;

export default Pops;
