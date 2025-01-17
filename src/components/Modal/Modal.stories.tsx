// src/Modal.stories.js
import React, { useState } from "react";
import { Modal } from "./Modal";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/Modal",
  component: Modal,
} as Meta;

const Template: StoryFn = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-screen bg-red-200">
      <div>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {args.children}
        </Modal>
      </div>
    </div>
  );
};

export const Modalexample = Template.bind({});
Modalexample.args = {
  children: (
    <>
      <h2>Modal Title</h2>
      <p>This is the content of the modal.</p>
    </>
  ),
};
