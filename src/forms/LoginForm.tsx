import { Form, Formik } from "formik";
import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import loginValidation from "./validation";

const initialValues = {
  username: "",
  password: "",
};
const LoginForm = () => {
    console.log(initialValues)
  return ( 
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidation}
      onSubmit={(values) => {
        alert( values);
      }}
    >
{
      ({isValid})=>(<Form className="flex flex-col gap-5 rounded-md border border-gray-300 bg-white p-4">
        <>
        <Input label="Username" type="text" name="username" />
        <Input label="password" type="password" name="password" />
        <Button type="submit" variant="primary" disabled={!isValid}>
          submit
        </Button>
        </>
      </Form>)
}
    </Formik>
    
  );
};

export default LoginForm;
