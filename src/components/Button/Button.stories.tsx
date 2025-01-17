import React from "react";
import { Meta,StoryFn } from "@storybook/react";
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
const Template: StoryFn<ButtonProps> = (args) => <Button {...args} >hello !</Button>;

// Primary Button
export const Primary = Template.bind({});
Primary.args = {
 
  variant: "primary", // Passing variant as "primary"
};

// Secondary Button
export const Secondary = Template.bind({});
Secondary.args = {
  
  variant: "secondary", // Passing variant as "secondary"
};

// Button with Custom ClassName
export const CustomClass = Template.bind({});
CustomClass.args = {
  
  variant: "primary",
  className: "rounded-full", // Adding custom Tailwind class
};
