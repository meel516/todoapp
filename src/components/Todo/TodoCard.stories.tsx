// src/Modal.stories.js
import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import TodoCard from "./TodoCard";

export default {
  title: "Components/TodoCard",
  component: TodoCard,
} as Meta;

const Template: StoryFn = (args) => {
  return <TodoCard {...args} />;
};

export const todoCardExample = Template.bind({}); 
  assignedUser:  "Saleem",
  dueDate: "27-11-1997",
  id: "sda",
  description: "sadd", 
  priority: "high", 
  status: "in progress",
  title: "Learn JavaScript"
};