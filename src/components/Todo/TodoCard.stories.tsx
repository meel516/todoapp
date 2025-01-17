// src/Modal.stories.js
import React, { useState } from "react";
import { Modal } from "./Modal";
import { Meta, StoryFn } from "@storybook/react";
import TodoCard from "./TodoCard";


export default {
  title: "Components/Tododcard",
  component: TodoCard,
} as Meta;

const Template: StoryFn = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-screen bg-red-200">
      <div>
     
       <TodoCard assignedUser="saleem" dueDate={"27-11-1997"} id="sda" description ={"sadd"} priority={"high"}status="in progress" title="learn javascript" />
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
