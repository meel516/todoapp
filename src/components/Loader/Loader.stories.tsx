import { Meta, StoryFn } from "@storybook/react";

import Loader from "./Loader";

export default {
  title: "Components/Loader", // Define where your Button story will appear in Storybook
  component: Loader, // Attach the Button component
  argTypes: {
    isLoading: Boolean,
  },
} as Meta;

// Template to render the Button component
const Template: StoryFn = (args) => <Loader {...args} />;

// Primary Button
export const Loaderexample = Template.bind({});
Loaderexample.args = {
  isLoading: true, // Passing variant as "primary"
};
