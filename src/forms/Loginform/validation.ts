import * as Yup from "yup";
const loginValidation =Yup.object({
    username: Yup.string().required("username is required"),
    password: Yup.string()
       .min(3, "Password must be at least 8 characters long")
       .required("Password is required"),
})
export default loginValidation