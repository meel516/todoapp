import { Form, Formik } from "formik";
import { Button } from "../../components/Button/Button";
import FormField, { Input } from "../../components/Input/FormField";
import loginValidation from "../Loginform/validation";
import useMutation from "../../api/useMutation";
import { useFetch } from "../../api/useFetch";
import { configs } from "../../configs";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

const initialValues = {
  username: "",
  password: "",
};
const LoginForm = () => {
   const {Login} =useAuth()
   const navigate =useNavigate()
   const handleSubmit = async (values)=>{
    try{
      const response = await apiClient.get("/auth"); // Using apiClient

      if(response.data.username ==values.username && response.data.password ==values.password){
      Login(values.username)
      navigate("/home")
      
      }
    }
    catch(err){
       console.error(err)
    }

   }
  return ( 
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidation}
      validateOnMount
      onSubmit={(values) => {
       handleSubmit(values)
      }}
    >
{
      ({isValid})=>(<Form className="flex flex-col gap-5 rounded-md border border-gray-300 bg-white p-4">
        <>
        <FormField  label="Username" type="text" name="username" />
        <FormField label="password" type="password" name="password" />
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
