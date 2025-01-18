// src/Modal.stories.js
import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import TodoCard from "./TodoCard";

export default {
  title: "Components/TodoCard", // Corrected the title to "TodoCard"
  component: TodoCard,
} as Meta;

const Template: StoryFn = (args) => {
  return <TodoCard {...args} />;
};

export const todoCardExample = Template.bind({}); // Corrected the export name
todoCardExample.args = {
  assignedUser:  "Saleem", // Capitalized the name for consistency
  dueDate: "27-11-1997", // Changed to a string instead of an object
  id: "sda",
  description: "sadd", // Changed to a string instead of an object
  priority: "high", // Changed to a string instead of an object
  status: "in progress",
  title: "Learn JavaScript"// Capitalized for consistency
};