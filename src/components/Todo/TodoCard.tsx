import {
  completedSvg,
  inProgressSvg,
  menuSvg,
  todoSvg,
} from "../../assets/svgs/index.ts";
import Pops from "../popup/Pops.tsx";
type todoCard = {
  status: "done" | "todo" | "inProgress";
  title: string;
  description: string;
  dueDate: string;
  priority: "high" | "low" | "medium";
  assignedUser: string;
  id: string;
};

const TodoCard = ({
  status,
  assignedUser,
  description,
  dueDate,
  id,
  priority,
  title,
  setSelectedtodo,
  handleModal,
  setMode,
  handleDeleteModal,
}: todoCard) => {
  return (
    <>
      <div className="transition-transform transform hover:scale-105 relative">
        <div
          className={`todo-card ${status} flex flex-col bg-white shadow-md rounded-t-lg p-4  ${
            priority === "high"
              ? "border-2 border-red-100"
              : priority === "medium"
                ? "border border-yellow-500"
                : "border border-green-500"
          }`}
        >
          <div className="todo-card-header flex justify-between items-center border-b pb-2 mb-2">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <div className="gap-1 flex items-center">
              <img
                width="24px"
                height="24px"
                src={
                  status == "done"
                    ? completedSvg
                    : status == "inProgress"
                      ? inProgressSvg
                      : todoSvg
                }
              />
              <span
                className={`text-sm font-medium ${
                  status === "done"
                    ? "text-green-500"
                    : status == "inProgress"
                      ? "text-blue-500"
                      : "text-red-300"
                }`}
              >
                {status}
              </span>
              <Pops
                className={
                  "min-w-[170px] top-3 right-2 border-2 rounded-lg cursor-pointer"
                }
                wrapper={
                  <img
                    className="relative cursor-pointer self-end"
                    src={menuSvg}
                  />
                }
              >
                <Pops.Item
                  className={"text-blue-400 border-b-2"}
                  onClick={() => {
                    setSelectedtodo(id);
                    handleModal(true);
                    setMode("edit");
                  }}
                >
                  Edit todo
                </Pops.Item>
                <Pops.Item
                  className={"text-red-500"}
                  onClick={() => {
                    setSelectedtodo(id);
                    handleDeleteModal(true);
                    setMode("delete");
                  }}
                >
                  delete todo
                </Pops.Item>
              </Pops>
            </div>
          </div>
          <div className="todo-card-content">
            <p className="text-gray-700 mb-2">{description}</p>
            <div className="todo-card-meta flex justify-between text-sm text-gray-600">
              <span>
                Due:{" "}
                <span className="font-medium text-gray-800">{dueDate}</span>
              </span>

              <span>
                Assigned to:{" "}
                <span className="font-medium text-gray-800">
                  {assignedUser}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div
          className={`w-full p-2 rounded-b-md text-white flex justify-center ${
            priority === "high"
              ? "bg-red-400"
              : priority === "medium"
                ? "bg-yellow-500"
                : "bg-green-500"
          }`}
        >
          Priority: <span className={`font-medium `}>{priority}</span>
        </div>
      </div>
    </>
  );
};

export default TodoCard;
