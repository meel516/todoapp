import { useField } from "formik";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type: string;
  name: string;
  label: string;
};
export const Input = ({ type,name,label,...rest }: InputProps) => {
  const [field, meta] = useField(name);
  
  return (
    <>
    <div>    
    <div className={`flex flex-col gap-3`}>
      <label htmlFor={name} >{label}</label>
      <input className={`p-3 bg-gray-100 rounded-md  ${meta.error 
            ? "shadow-[0_0_0_2px_rgba(248,113,113,0.2)]" 
            : "focus:shadow-[0_2px_8px_-1px_rgba(0,0,0,0.1),0_0_0_3px_rgba(59,130,246,0.2)]"
          }`} type={type} {...field} {...rest} />
      
    </div>
    {meta.touched && meta.error?<div className="text-red-500">{meta.error}</div>:null}
    </div>
    </>

  );
};
