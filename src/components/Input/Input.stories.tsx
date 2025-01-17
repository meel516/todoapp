// src/Modal.stories.js
import React, { useState } from "react";

import { Meta, StoryFn } from "@storybook/react";
import { Input } from "./Input";

export default {
  title: "Components/Input",
  component: Input,
} as Meta;

const Template: StoryFn = (args) => {
 

  return (
    <div className="w-full h-screen flex justify-center itemss-center">
    
       <Input name="todo" type="text" error="this is not valid vbalue" label="enter your name" />
    
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
