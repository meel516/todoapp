import React, { useState } from 'react';


const DropDown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);

  };

  return (
    <div className="relative p-4">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { isOpen, toggleDropdown })
      )}
    </div>
  );
};


const DropDownButton = ({ children, toggleDropdown, isOpen }) => {
  return (
    <button
      onClick={toggleDropdown}
      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-left flex items-center justify-between hover:bg-gray-100 focus:outline-none"
    >
      {children}
      <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
        ▼ 
      </span>
    </button>
  );
};


const DropDownMenu = ({ isOpen,toggleDropdown, children }) => {
  if (!isOpen) return null; 

  return (
    <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
      <ul onClick={toggleDropdown} className="py-2">{children}</ul>
    </div>
  );
};


const DropDownItem = ({ children, onClick }) => {
  return (
    <li
      onClick={onClick}
      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
    >
      {children}
    </li>
  );
};

DropDown.Button = DropDownButton;
DropDown.Menu = DropDownMenu;
DropDown.Item = DropDownItem;

export default DropDown;
