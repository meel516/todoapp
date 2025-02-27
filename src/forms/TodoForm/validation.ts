import * as Yup from "yup";

const todovalidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  status: Yup.string().required("Status is required"),
  dueDate: Yup.date().required("Due date is required"),
  description: Yup.string().required("Description is required"),
  priority: Yup.string().required("Priority is required"),
  assignedUser: Yup.string().required("Assigned User is required"),
});
export default todovalidationSchema;
