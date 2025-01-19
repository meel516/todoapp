// src/FormField.tsx
import { useField } from "formik";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Option = {
  value: string;
  label: string;
};

type FormFieldProps = {
  name: string;
  label: string;
  type: "text" | "select" | "date" | "number" | "password";
  options?: Option[]; 
};

const FormField = ({ name, label, type, options, ...rest }: FormFieldProps) => {
  const [field, meta, helpers] = useField(name);

  switch (type) {
    case "text":
      return (
        <div className="flex flex-col gap-3">
          <label htmlFor={name}>{label}</label>
          <input
            className={`p-3 bg-gray-100 rounded-md ${
              meta.error
                ? "shadow-[0_0_0_2px_rgba(248,113,113,0.2)]"
                : "focus:shadow-[0_2px_8px_-1px_rgba(0,0,0,0.1),0_0_0_3px_rgba(59,130,246,0.2)]"
            }`}
            type="text"
            {...field}
            {...rest}
          />
          {meta.touched && meta.error && (
            <div className="text-red-500">{meta.error}</div>
          )}
        </div>
      );
    case "select":
      return (
        <div className="flex flex-col gap-3">
          <label htmlFor={name}>{label}</label>
          <select
            {...field}
            className={`p-3 bg-gray-100 rounded-md ${
              meta.error
                ? "shadow-[0_0_0_2px_rgba(248,113,113,0.2)]"
                : "focus:shadow-[0_2px_8px_-1px_rgba(0,0,0,0.1),0_0_0_3px_rgba(59,130,246,0.2)]"
            }`}
          >
            <option value="">Select an option</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {meta.touched && meta.error && (
            <div className="text-red-500">{meta.error}</div>
          )}
        </div>
      );
    case "date":
      return (
        <div className="flex flex-col gap-3">
          <label htmlFor={name}>{label}</label>
          <ReactDatePicker
            selected={field.value ? new Date(field.value) : null}
            onChange={(date) => helpers.setValue(date)}
            className={`p-3 bg-gray-100 rounded-md ${
              meta.error
                ? "shadow-[0_0_0_2px_rgba(248,113,113,0.2)]"
                : "focus:shadow-[0_2px_8px_-1px_rgba(0,0,0,0.1),0_0_0_3px_rgba(59,130,246,0.2)]"
            }`}
          />
          {meta.touched && meta.error && (
            <div className="text-red-500">{meta.error}</div>
          )}
        </div>
      );
    case "number":
      return (
        <div className="flex flex-col gap-3">
          <label htmlFor={name}>{label}</label>
          <input
            className={`p-3 bg-gray-100 rounded-md ${
              meta.error
                ? "shadow-[0_0_0_2px_rgba(248,113,113,0.2)]"
                : "focus:shadow-[0_2px_8px_-1px_rgba(0,0,0,0.1),0_0_0_3px_rgba(59,130,246,0.2)]"
            }`}
            type="number"
            {...field}
            {...rest}
          />
          {meta.touched && meta.error && (
            <div className="text-red-500">{meta.error}</div>
          )}
        </div>
      );
    case "password":
      return (
        <div className="flex flex-col gap-3">
          <label htmlFor={name}>{label}</label>
          <input
            className={`p-3 bg-gray-100 rounded-md ${
              meta.error
                ? "shadow-[0_0_0_2px_rgba(248,113,113,0.2)]"
                : "focus:shadow-[0_2px_8px_-1px_rgba(0,0,0,0.1),0_0_0_3px_rgba(59,130,246,0.2)]"
            }`}
            type="password"
            {...field}
            {...rest}
          />
          {meta.touched && meta.error && (
            <div className="text-red-500">{meta.error}</div>
          )}
        </div>
      );
    default:
      return null;
  }
};

export default FormField;
