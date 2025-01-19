import { Meta, StoryFn } from "@storybook/react";
import Toast from "./Toast";
import useToast from "../../hooks/useToast";

export default {
  title: "Components/Toast",
  component: Toast,
} as Meta;

const Template: StoryFn = () => {
  // Independent useToast instance for this specific component
  const { showToast, triggerToast } = useToast();

  return (
    <div className="w-full h-screen bg-red-200 flex flex-col items-center justify-center">
      <button
        onClick={triggerToast}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Show Toast
      </button>
      <Toast showToast={showToast} message="This is a unique toast!" mode="warning" />
    </div>
  );
};

export const ToastExample = Template.bind({});
ToastExample.args = {}

