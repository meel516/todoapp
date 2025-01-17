import React from "react";
import { Meta, Story, StoryFn } from "@storybook/react";
import { Button, ButtonProps } from "./Button"; // Import Button component and ButtonProps

export default {
  title: "Components/Button", // Define where your Button story will appear in Storybook
  component: Button, // Attach the Button component
  argTypes: {
    // Define what can be changed dynamically in the Storybook UI
    variant: {
      control: {
        type: "radio", // Allow a radio button selection for variants
        options: ["primary", "secondary"], // Available options
      },
    },
  },
} as Meta<ButtonProps>;

// Template to render the Button component
const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

// Primary Button
export const Primary = Template.bind({});
Primary.args = {
  children: "Primary Button",
  variant: "primary", // Passing variant as "primary"
};

// Secondary Button
export const Secondary = Template.bind({});
Secondary.args = {
  children: "Secondary Button",
  variant: "secondary", // Passing variant as "secondary"
};

// Button with Custom ClassName
export const CustomClass = Template.bind({});
CustomClass.args = {
  children: "Custom Class Button",
  variant: "primary",
  className: "rounded-full", // Adding custom Tailwind class
};
