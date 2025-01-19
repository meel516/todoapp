import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import DropDown from "./DropDown";

// Default export with meta information
export default {
  title: "Components/DropDown",
  component: DropDown,
} as Meta;

// Basic usage of DropDown with static items
const BasicDropdown: Story = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (value) => {
    setSelectedOption(value);
  };

  return (
    <div className="p-6 max-w-xs mx-auto">
      <h1 className="text-xl font-semibold mb-4">Custom Dropdown</h1>

      <DropDown>
        <DropDown.Button>
          {selectedOption || "Select an option"}
        </DropDown.Button>
        <DropDown.Menu>
          <DropDown.Item onClick={() => handleSelect("Option 1")}>
            Option 1
          </DropDown.Item>
          <DropDown.Item onClick={() => handleSelect("Option 2")}>
            Option 2
          </DropDown.Item>
          <DropDown.Item onClick={() => handleSelect("Option 3")}>
            Option 3
          </DropDown.Item>
        </DropDown.Menu>
      </DropDown>
    </div>
  );
};

export const Basic = BasicDropdown;

// Dropdown with pre-selected option
const PreSelectedDropdown: Story = () => {
  const [selectedOption, setSelectedOption] = useState("Option 2");

  const handleSelect = (value) => {
    setSelectedOption(value);
  };

  return (
    <div className="p-6 max-w-xs mx-auto">
      <h1 className="text-xl font-semibold mb-4">Custom Dropdown with Pre-selected Option</h1>

      <DropDown>
        <DropDown.Button>
          {selectedOption || "Select an option"}
        </DropDown.Button>
        <DropDown.Menu>
          <DropDown.Item onClick={() => handleSelect("Option 1")}>
            Option 1
          </DropDown.Item>
          <DropDown.Item onClick={() => handleSelect("Option 2")}>
            Option 2
          </DropDown.Item>
          <DropDown.Item onClick={() => handleSelect("Option 3")}>
            Option 3
          </DropDown.Item>
        </DropDown.Menu>
      </DropDown>
    </div>
  );
};

export const PreSelected = PreSelectedDropdown;

// Dropdown with custom items (e.g., dynamic or different content)
const CustomItemsDropdown: Story = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (value) => {
    setSelectedOption(value);
  };

  return (
    <div className="p-6 max-w-xs mx-auto">
      <h1 className="text-xl font-semibold mb-4">Custom Dropdown with Dynamic Items</h1>

      <DropDown>
        <DropDown.Button>
          {selectedOption || "Select an option"}
        </DropDown.Button>
        <DropDown.Menu>
          <DropDown.Item onClick={() => handleSelect("Custom Option 1")}>
            Custom Option 1
          </DropDown.Item>
          <DropDown.Item onClick={() => handleSelect("Custom Option 2")}>
            Custom Option 2
          </DropDown.Item>
          <DropDown.Item onClick={() => handleSelect("Custom Option 3")}>
            Custom Option 3
          </DropDown.Item>
          <DropDown.Item onClick={() => handleSelect("Custom Option 4")}>
            Custom Option 4
          </DropDown.Item>
        </DropDown.Menu>
      </DropDown>
    </div>
  );
};

export const CustomItems = CustomItemsDropdown;
