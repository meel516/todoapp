import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/FormField";
import LoginForm from "../forms/Loginform/LoginForm";

const Login = () => {
  return (
    <div className="w-full items-center h-screen bg-slate-100 grid grid-cols-6 p-5">
      <div className="col-span-6 xl:col-span-2">
        <LoginForm />
      </div>
      <div className="text-2xl xl:col-start-4"> welcome to Todo list!</div>
    </div>
  );
};

export default Login;
