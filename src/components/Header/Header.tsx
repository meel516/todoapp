import { useAuth } from "../../contexts/AuthContext";
import Pops from "../popup/Pops";

export const Header = () => {
  const { userDetails, Logout } = useAuth();
  return (
    <nav className="p-3 bg-slate-200 w-full sticky flex justify-between items-center">
      <h1 className="text-2xl text-gray-500">Todo App</h1>
      <div className="rounded-md flex py-2 px-3 items-center gap-2">
        <span className="text-xl">{userDetails?.username}</span>
        <Pops
          className={"top-[40px] right-[40px] bg-slate-200"}
          wrapper={
            <div className="rounded-full text-2xl w-[40px] aspect-square bg-slate-300 select-none inline-flex justify-center cursor-pointer items-center">
              {userDetails?.username?.charAt(0)}
            </div>
          }
        >
          <Pops.Item className={"text-blue-500"} onClick={Logout}>
            Logout
          </Pops.Item>
        </Pops>
      </div>
    </nav>
  );
};
