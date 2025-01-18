import { Form, Formik } from "formik";
import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import loginValidation from "./validation";
import useMutation from "../api/useMutation";
import { useFetch } from "../api/useFetch";
import { configs } from "../configs";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const initialValues = {
  username: "",
  password: "",
};
const LoginForm = () => {
   const {Login} =useAuth()
   const navigate =useNavigate()
   const handleSubmit = async (values)=>{
    try{
      const response = await fetch(configs.BASE_URL+"/auth");
      const data =await response.json()
      if(data.username ==values.username && data.password ==values.password){
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
      onSubmit={(values) => {
       handleSubmit(values)
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
