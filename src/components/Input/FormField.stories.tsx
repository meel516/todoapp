// src/FormField.stories.tsx
import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Formik, Form } from "formik";
import FormField from "./FormField";

// Define Storybook metadata for the component
export default {
  title: "Components/FormField",
  component: FormField,
} as Meta;

const Template: StoryFn = (args) => (
  <Formik
    initialValues={{
      text: "",
      select: "",
      date: "",
    }}
    onSubmit={(values) => console.log(values)}
  >
    <Form>
      <FormField {...args} />
    </Form>
  </Formik>
);

export const TextField = Template.bind({});
TextField.args = {
  name: "text",
  label: "Enter your name",
  type: "text",
};

export const SelectField = Template.bind({});
SelectField.args = {
  name: "select",
  label: "Choose a fruit",
  type: "select",
  options: [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
  ],
};

export const DateField = Template.bind({});
DateField.args = {
  name: "date",
  label: "Pick a date",
  type: "date",
};
