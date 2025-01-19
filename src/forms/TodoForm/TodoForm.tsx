import { Formik, Field, Form, FormikHelpers } from "formik";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import FormField from "../../components/Input/FormField";
import { Button } from "../../components/Button/Button";
import todovalidationSchema from "./validation";
import useMutation from "../../api/useMutation";
import { useFetch } from "../../api/useFetch";

const initialValues = {
  id: "",
  title: "",
  status: "",
  dueDate: "",
  description: "",
  assignedUser: 1,
  priority: "",
  tags: [],
};

const TodoForm = ({
  mode,
  mutateTodo,
  selectedtodo,
  handleCloseModal,
  usersData,
}) => {
  const { mutation: todoPost } = useMutation();
  const { data: cardData, isLoading } = useFetch(
    "todo",
    `${mode == "edit" ? "getById" : null}`,
    selectedtodo,
  );

  const [initialValues, setInitialValues] = useState({
    id: "",
    title: "",
    status: "",
    dueDate: "2020-12-31",
    description: "",
    assignedUser: "",
    priority: "",
    tags: [],
  });
  const postTodo = async (values) => {
    try {
      const { results } = await todoPost(
        "todo",
        mode == "edit" ? "update" : "create",
        mode == "edit" ? selectedtodo : undefined,
        {
          body: { ...values, ...(mode == "edit" ? {} : { id: uuidv4() }) },
          method: mode == "edit" ? "PUT" : "POST",
          isFormData: true,
        },
      );
      mutateTodo();
      handleCloseModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (
    values: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>,
  ) => {
    postTodo(values);
  };

  useEffect(() => {
    if (mode == "edit" && cardData) {
      setInitialValues(cardData);
    } else {
      setInitialValues({
        id: "",
        title: "",
        status: "",
        dueDate: "2020-12-31",
        description: "",
        assignedUser: "",
        priority: "",
        tags: [],
      });
    }
  }, [isLoading, mode]);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={todovalidationSchema}
      enableReinitialize
    >
      {({ isValid }) => (
        <Form className="flex flex-col gap-5 rounded-md border border-gray-300 bg-white p-4">
          <FormField name="title" type="text" label="Enter a title" />

          <FormField
            name="status"
            type="select"
            label="Select status"
            options={[
              { value: "todo", label: "To Do" },
              { value: "inProgress", label: "In Progress" },
              { value: "done", label: "Done" },
            ]}
          />

          <FormField name="dueDate" type="date" label="Due date" />

          <FormField name="description" type="text" label="Description" />

          <FormField
            name="priority"
            type="select"
            label="Priority"
            options={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
          />
          <FormField
            name="assignedUser"
            type="select"
            label="Assign User"
            options={usersData?.map((user) => ({
              value: user.id,
              label: `${user.name}`,
            }))}
          />

          <Button type="submit" variant="primary" disabled={!isValid}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default TodoForm;
